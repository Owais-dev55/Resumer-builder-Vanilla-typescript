const skillssection = document.querySelector(".skills-section");
const btn = document.querySelector(".btn");
btn.addEventListener("click", (e) => {
  e.preventDefault();
  const input = document.createElement("input");
  input.type = "text";
  input.placeholder = "Enter your skill";
  skillssection.appendChild(input);
});
const generateResumeButton = document.querySelector(".btn1");
generateResumeButton.addEventListener("click", (e) => {
  e.preventDefault();
  const nameInput = document.querySelector("#name");
  const emailInput = document.querySelector("#email");
  const phoneInput = document.querySelector("#number-input");
  const educationInput = document.querySelector("#education");
  const workExperienceInput = document.querySelector("#work_experience");
  const skillsInputs = document.querySelectorAll(".skills-section input");
  const skillsArray = [...skillsInputs];
  const resumeTemplate = `
    <h1>${nameInput.value}</h1>
    <h2>Contact Information</h2>
    <ul>
      <li>Email: ${emailInput.value || "No Email"}</li>
      <li>Phone: ${phoneInput.value || "No Phone"}</li>
    </ul>
    <h2>Education</h2>
    <p>${educationInput.value || "No Education Information"}</p>
    <h2>Work Experience</h2>
    <p>${workExperienceInput.value || "No Work Experience"}</p>
    <h2>Skills</h2>
    <ul>
      ${skillsArray
        .map((skill) => `<li>${skill.value || "No Skill"}</li>`)
        .join("")}
    </ul>
  `;
  const resumeContainer = document.createElement("div");
  const downloadButton = document.createElement("button");
  resumeContainer.className = "resume-output";
  resumeContainer.innerHTML = resumeTemplate;
  document.body.innerHTML = "";
  document.body.prepend(resumeContainer);
  resumeContainer.appendChild(downloadButton);
  downloadButton.textContent = "Download as HTML";
  downloadButton.className = "download-button";
  downloadButton.addEventListener("click", () => {
    const blob = new Blob([resumeTemplate], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "resume.txt";
    a.click();
    URL.revokeObjectURL(url);
  });
  const editButton = document.createElement("button");
  editButton.textContent = "Edit Resume";
  editButton.className = "edit-button";
  resumeContainer.appendChild(editButton);
  let isEditing = false;
  editButton.addEventListener("click", () => {
    if (!isEditing) {
      const nameField = document.querySelector(".resume-output h1");
      const emailField = document.querySelectorAll(".resume-output ul li")[0];
      const phoneField = document.querySelectorAll(".resume-output ul li")[1];
      const educationField = document.querySelector(
        ".resume-output p:nth-of-type(1)"
      );
      const experienceField = document.querySelector(
        ".resume-output p:nth-of-type(2)"
      );
      const skillsField = document.querySelector(
        ".resume-output ul:nth-of-type(2)"
      );
      nameField.innerHTML = `<input type="text" value="${nameField.textContent?.trim()}" id="edit-name" />`;
      emailField.innerHTML = `Email: <input type="email" value="${emailField.textContent
        ?.replace("Email: ", "")
        .trim()}" id="edit-email" />`;
      phoneField.innerHTML = `Phone: <input type="tel" value="${phoneField.textContent
        ?.replace("Phone: ", "")
        .trim()}" id="edit-phone" />`;
      educationField.innerHTML = `<textarea id="edit-education">${educationField.textContent?.trim()}</textarea>`;
      experienceField.innerHTML = `<textarea id="edit-experience">${experienceField.textContent?.trim()}</textarea>`;
      const skillItems = Array.from(skillsField.querySelectorAll("li"));
      skillsField.innerHTML = "";
      skillItems.forEach((skill) => {
        const input = document.createElement("input");
        input.type = "text";
        input.value = skill.textContent?.trim() || "";
        skillsField.appendChild(input);
      });
      editButton.textContent = "Save Changes";
      isEditing = true;
    } else {
      const editedName = document.querySelector("#edit-name").value;
      const editedEmail = document.querySelector("#edit-email").value;
      const editedPhone = document.querySelector("#edit-phone").value;
      const editedEducation = document.querySelector("#edit-education").value;
      const editedExperience = document.querySelector("#edit-experience").value;
      const editedSkills = Array.from(
        document.querySelectorAll(".resume-output ul:nth-of-type(2) input")
      ).map((input) => input.value);
      const nameField = document.querySelector(".resume-output h1");
      const emailField = document.querySelectorAll(".resume-output ul li")[0];
      const phoneField = document.querySelectorAll(".resume-output ul li")[1];
      const educationField = document.querySelector(
        ".resume-output p:nth-of-type(1)"
      );
      const experienceField = document.querySelector(
        ".resume-output p:nth-of-type(2)"
      );
      const skillsField = document.querySelector(
        ".resume-output ul:nth-of-type(2)"
      );
      nameField.textContent = editedName;
      emailField.textContent = `Email: ${editedEmail}`;
      phoneField.textContent = `Phone: ${editedPhone}`;
      educationField.textContent = editedEducation;
      experienceField.textContent = editedExperience;
      skillsField.innerHTML = "";
      editedSkills.forEach((skill) => {
        const li = document.createElement("li");
        li.textContent = skill || "No Skill";
        skillsField.appendChild(li);
      });
      editButton.textContent = "Edit Resume";
      isEditing = false;
    }
  });
});
