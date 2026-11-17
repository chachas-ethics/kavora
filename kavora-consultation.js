(() => {
  const currentScript = document.currentScript;
  const footer = document.querySelector("footer");

  if (!currentScript || !footer) {
    console.error("Kavora consultation form could not find its script or page footer.");
    return;
  }

  const existingForm = document.getElementById("kavora-form");
  if (existingForm) {
    const existingSection = existingForm.closest("section");
    if (existingSection) existingSection.remove();
  }

  const showLoadError = (error) => {
    console.error("Kavora consultation form failed to load.", error);
    const message = document.createElement("p");
    message.setAttribute("role", "alert");
    message.style.cssText =
      "margin:2rem auto;padding:1rem;max-width:48rem;color:#991b1b;text-align:center";
    message.textContent =
      "The travel enquiry form could not be loaded. Please contact Kavora directly.";
    footer.before(message);
  };

  fetch(new URL("index.html", currentScript.src))
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Could not load the shared form (${response.status}).`);
      }
      return response.text();
    })
    .then((html) => {
      const sourceDocument = new DOMParser().parseFromString(html, "text/html");
      const sourceForm = sourceDocument.getElementById("kavora-form");
      const sourceSection = sourceForm && sourceForm.closest("section");
      const sourceStyles = [...sourceDocument.querySelectorAll("style")].filter(
        (style) => style.textContent.includes("#kavora-form .form-label")
      );

      if (!sourceSection || !sourceStyles.length) {
        throw new Error("The shared form markup or styles are missing from index.html.");
      }

      const section = sourceSection.cloneNode(true);
      document.querySelectorAll('[id="contact"]').forEach((element) => {
        element.removeAttribute("id");
      });

      footer.before(section);
      sourceStyles.forEach((style) => footer.before(style.cloneNode(true)));
      initializeForm(section.querySelector("#kavora-form"));

      if (window.location.hash === "#contact") {
        section.scrollIntoView();
      }
    })
    .catch(showLoadError);

  function initializeForm(form) {
    if (!form || form.dataset.initialized) return;
    form.dataset.initialized = "true";

    const section = form.closest("section");
    const steps = [...form.querySelectorAll(".form-step")];
    const nextButton = form.querySelector("#next-button");
    const backButton = form.querySelector("#back-button");
    const submitButton = form.querySelector("#submit-button");
    const progressBar = section.querySelector("#progress-bar");
    const stepLabel = section.querySelector("#step-label");
    const stepCount = section.querySelector("#step-count");
    const errorBox = form.querySelector("#form-error");
    const stepNames = [
      "The vision",
      "Your experiences",
      "The finer details",
      "Your personal details"
    ];
    let currentStep = 0;

    function showStep(index) {
      currentStep = index;
      steps.forEach((step, stepIndex) => {
        step.classList.toggle("hidden", stepIndex !== index);
      });

      stepLabel.textContent =
        `Step ${String(index + 1).padStart(2, "0")} — ${stepNames[index]}`;
      stepCount.textContent =
        `${String(index + 1).padStart(2, "0")} / ${String(steps.length).padStart(2, "0")}`;
      progressBar.style.width = `${((index + 1) / steps.length) * 100}%`;
      backButton.classList.toggle("hidden", index === 0);
      nextButton.classList.toggle("hidden", index === steps.length - 1);
      submitButton.classList.toggle("hidden", index !== steps.length - 1);
      submitButton.classList.toggle("flex", index === steps.length - 1);
      errorBox.classList.add("hidden");
    }

    function validateStep() {
      const requiredFields = [...steps[currentStep].querySelectorAll("[required]")];

      for (const field of requiredFields) {
        if (field.type === "checkbox" && field.name === "consent") {
          if (!field.checked) {
            errorBox.textContent =
              "Please provide consent before sending your enquiry.";
            errorBox.classList.remove("hidden");
            field.focus();
            return false;
          }
        } else if (!field.checkValidity()) {
          errorBox.textContent =
            "Please complete the required details before continuing.";
          errorBox.classList.remove("hidden");
          field.reportValidity();
          return false;
        }
      }

      errorBox.classList.add("hidden");
      return true;
    }

    nextButton.addEventListener("click", () => {
      if (validateStep()) {
        showStep(Math.min(currentStep + 1, steps.length - 1));
      }
    });

    backButton.addEventListener("click", () => {
      showStep(Math.max(currentStep - 1, 0));
    });

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      if (!validateStep()) return;

      const data = new FormData(form);
      const get = (key) => String(data.get(key) || "").trim();
      const experiences = data.getAll("experiences");
      const message = [
        "KAVORA | PRIVATE TRAVEL ENQUIRY",
        "",
        "THE VISION",
        `Dream experience: ${get("dream") || "Not specified"}`,
        `Travelling as: ${get("travellerType") || "Not specified"}`,
        "",
        "PREFERRED EXPERIENCES",
        experiences.length ? experiences.join(", ") : "To be discussed",
        `Destination: ${get("destination") || "Open to recommendations"}`,
        "",
        "TRAVEL DETAILS",
        `Preferred date: ${get("departure") || "Flexible / not specified"}`,
        `Date flexibility: ${get("flexibility") || "Not specified"}`,
        `Duration: ${get("duration") || "Not specified"}`,
        `Travellers: ${get("travellers") || "Not specified"}`,
        `Indicative total budget (USD): ${get("investment") || "Prefer to discuss"}`,
        `Additional preferences: ${get("extras") || "None provided"}`,
        "",
        "CLIENT CONTACT",
        `Name: ${get("fullName")}`,
        `Email: ${get("email")}`,
        `Phone / WhatsApp: ${get("phone")}`,
        `Preferred contact method: ${get("contactPreference") || "WhatsApp"}`,
        "",
        "This is a travel enquiry, not a confirmed booking."
      ].join("\n");
      const kavoraWhatsApp = "255685764280";

      if (!/^255\d{9}$/.test(kavoraWhatsApp)) {
        errorBox.textContent =
          "The form is ready, but Kavora's WhatsApp number must be configured before enquiries can be sent. Please contact the website administrator.";
        errorBox.classList.remove("hidden");
        return;
      }

      const whatsappURL =
        `https://wa.me/${kavoraWhatsApp}?text=${encodeURIComponent(message)}`;
      window.open(whatsappURL, "_blank", "noopener,noreferrer");
    });

    const departure = form.querySelector("#departure");
    const localToday = new Date();
    departure.min = [
      localToday.getFullYear(),
      String(localToday.getMonth() + 1).padStart(2, "0"),
      String(localToday.getDate()).padStart(2, "0")
    ].join("-");

    showStep(0);
  }
})();
