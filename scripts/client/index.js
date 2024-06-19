// GLOBALS //

const body = document.querySelector("body");
const navLinks = document.getElementById("nav-links");
const navButtons = document.getElementsByClassName("button");
// pages
const projectsPage = document.getElementById("projects-page");
const aboutPage = document.getElementById("about-page");
const resumePage = document.getElementById("resume-page");
const pages = [projectsPage, aboutPage, resumePage];
// modal
const projectModal = document.getElementById("project-modal");
const closeButton = document.getElementById("close-button");
const modalTitle = document.getElementById("modal-title");
const modalLink = document.getElementById("button-link");
const modalSummary = document.getElementById("modal-summary");
const text1 = document.getElementById("modal-text1");
const gif1 = document.getElementById("modal-img1");
const text2 = document.getElementById("modal-text2");
const gif2 = document.getElementById("modal-img2");

// MAIN //

// invokes changePage function when one of the navbar buttons is pushed
navLinks.addEventListener("click", (e) => {
  changePage(e);
});

projectsPage.addEventListener("click", (e) => {
  showProjectModal(e);
});

window.addEventListener("click", (e) => {
  hideProjectModal(e);
});

loadProjectData();

// FUNCTIONS //

// Clears pages, then displays the selected page //
function changePage(e) {
  window.scrollTo(0, 0);
  switch (e.target.id) {
    case "home-button":
      clearPage();
      e.target.classList.add("selected-button");
      break;
    case "projects-button":
      clearPage();
      projectsPage.classList.remove("hidden");
      projectsPage.classList.add("shown-page");
      e.target.classList.add("selected-button");
      break;
    case "resume-button":
      clearPage();
      resumePage.classList.remove("hidden");
      resumePage.classList.add("shown-page");
      e.target.classList.add("selected-button");
      break;
    case "about-button":
      clearPage();
      aboutPage.classList.remove("hidden");
      aboutPage.classList.add("shown-page");
      e.target.classList.add("selected-button");
      break;
  }
}

// Deselects nav-buttons and hides all pages //
function clearPage() {
  for (let button of navButtons) {
    button.classList.remove("selected-button");
  }
  for (let page of pages) {
    page.classList.add("hidden");
    page.classList.remove("shown-page");
  }
}

// Fills the html project lists with the project data //
function loadProjectData() {
  document.getElementById("project-list").innerHTML = addProjectButtons(
    projectData,
    "project"
  );
  document.getElementById("challenge-list").innerHTML = addProjectButtons(
    challengeData,
    "challenge"
  );
}

// Structures an html project-button from a collection of projects //
function addProjectButtons(projectArray, type) {
  var outputHTML = "";
  for (let project of projectArray) {
    const index = projectArray.indexOf(project);
    outputHTML += `<div class="project-button" value="${index}" data-type="${type}">
    <img src="${project.icon}" value="${index}" data-type="${type}" alt="" />
    <p value="${index}" data-type="${type}">${project.title}</p>
    </div>\n`;
  }
  return outputHTML;
}

// Shows modal when clicking on a project button //
function showProjectModal(e) {
  if (e.target.dataset.type) {
    projectModal.classList.remove("hidden");
    projectModal.classList.add("shown-modal");
    body.height = "100vh";
    body.style.overflowY = "hidden";
    fillProjectModal(e, projectData);
  }
}

// Fills the modal with data for the selected project-button //
function fillProjectModal(e, data) {
  const index = Number(e.target.attributes.value.value);
  // ensures that the second section is shown
  modalLink.style.display = "inline";
  text2.style.display = "inline";
  gif2.style.display = "inline";
  // if only redirect, then open new tab and close the modal
  if (data[index].redirect) {
    window.open(data[index].link);
    closeButton.click();
    return;
  }
  // fills in the necessary data for the project
  modalTitle.innerHTML = data[index].title;
  modalSummary.innerHTML = data[index].summary;
  text1.innerHTML = data[index].description1;
  gif1.src = data[index].gif1;
  // if project does not have link, description2, or gif2, their elements will be hidden
  if (data[index].link) {
    modalLink.href = data[index].link;
  } else {
    modalLink.style.display = "none";
  }
  if (data[index].description2) {
    text2.innerHTML = data[index].description2;
  } else {
    text2.style.display = "none";
  }
  if (data[index].gif2) {
    gif2.src = data[index].gif2;
  } else {
    gif2.style.display = "none";
  }
}

// Hides the modal if clicking off the modal or pressing the close button
function hideProjectModal(e) {
  const parent = e.target.parentNode;
  // only run if the modal is visible
  if (
    !projectModal.classList.contains("hidden") &&
    !e.target.classList.contains("project-button") &&
    !parent.classList.contains("project-button")
  ) {
    // if clicking off modal, or on the close button, then hide the modal
    if (
      (e.target != projectModal &&
        parent != projectModal &&
        !parent.classList.contains("modal-section")) ||
      e.target == closeButton
    ) {
      projectModal.classList.remove("shown-modal");
      projectModal.classList.add("hidden");
      body.height = "inherit";
      body.style.overflowY = "visible";
    }
  }
}
