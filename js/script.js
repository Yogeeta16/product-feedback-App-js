var modal = document.getElementById("create-new-feedback-modal");
var addNewButton = document.getElementById("add-feedback-button");
addNewButton.onclick = function () {
  modal.style.display = "block";
};
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

const newFeedbackForm = document.querySelector("#new-Feedback-Form");
const status_field = document.querySelector("#status-field");
let CreateFeedback = document.getElementById("CreateFeedback");
let upvotenumber = document.getElementsByClassName("upvotecountno");
let rmplannedCount = document.getElementById("rm-planned-Count");
let rmliveCount = document.getElementById("rm-live-Count");
let rminprogressCount = document.getElementById("rm-inprogress-Count");
let rm_Status = document.getElementsByClassName("rm-Status");
let feedbackcount = 0;
let feedbackcountshow = document.getElementById("feedback-count");

//get details of the modal form -----------------------------------------------------------------
let titlefield = document.getElementById("title");
let descriptionfield = document.getElementById("description");
let categoryfield = document.getElementById("status-field");
let rmStatusfield = document.getElementById("Roadmap-field");

let titlevalue = "";
let descriptionvalue = "";
let categoryvalue = "";
let rmStatusvalue = "";

titlefield.addEventListener("input", function (e) {
  titlevalue = e.target.value;
});

descriptionfield.addEventListener("input", function (e) {
  descriptionvalue = e.target.value;
});

categoryfield.addEventListener("input", function (e) {
  categoryvalue = e.target.value;
});
rmStatusfield.addEventListener("input", function (e) {
  rmStatusvalue = e.target.value;
});
let dupeArray = [];
///================local storage -----------------------------------------------------------------------
let f_id_token = 0;

window.addEventListener("load", () => {
  productRequests = JSON.parse(localStorage.getItem("productRequests")) || [];

  const Planned = localStorage.getItem("Planned") || 0;
  const Live = localStorage.getItem("Live") || 0;
  const InProgress = localStorage.getItem("InProgress") || 0;
  const f_id = localStorage.getItem("f_id") || 0;
  let uniqueArray = localStorage.getItem("uniqueArray") || [];

  CreateFeedback.addEventListener("click", (e) => {
    const feedbacks = {
      feedback_id: new Date().getTime(),
      title: titlevalue,
      description: descriptionvalue,
      category: categoryvalue,
      upvotenumberls: 0,
      feedbackItemCount: feedbackcount,
      Roadmap_status: rmStatusvalue,
      Comments: [],

      // comments: [],
    };

    productRequests.push(feedbacks);

    localStorage.setItem("productRequests", JSON.stringify(productRequests));

    titlevalue = "";
    descriptionvalue = "";

    modal.style.display = "none";
  });

  updateCounts();
  updatetags();
  updatestatusCounts();
  DisplayTodos();
});

//********************* counting number of feedbacks **and**updating on screen  ******************** */
function countListItems() {
  itemCount = 0;
  productRequests.forEach((feedbacks) => {
    itemCount++;
  });
  return itemCount;
}

const updateCounts = () => {
  feedbackcount = countListItems("boardcontainer");

  feedbackcountshow.textContent = `${feedbackcount}`;
};

//********************************************************************************************************** */
function DisplayTodos(arr = productRequests) {
  let board = document.getElementById("boardcontainer");
  board.innerHTML = "";
  arr.forEach((feedbacks) => {
    let cardDiv = document.createElement("div");
    cardDiv.classList.add("cardContainer", "task");
    let upvotecontainer = document.createElement("div");
    upvotecontainer.classList.add("upvotecount");
    let upvotearrow = document.createElement("i");
    upvotearrow.classList.add("bx", "bx-chevron-up");
    let upvotecountno = document.createElement("span");
    upvotecountno.classList.add("upvotecountno");
    upvotecountno.innerHTML = feedbacks.upvotenumberls;
    upvotecontainer.appendChild(upvotearrow);
    upvotecontainer.appendChild(upvotecountno);
    cardDiv.appendChild(upvotecontainer);

    let detailscontainer = document.createElement("div");

    detailscontainer.classList.add("feedback-details");
    let cardHeading = document.createElement("div");
    cardHeading.classList.add("cardHeading");
    let cardDescription = document.createElement("div");
    cardDescription.classList.add("cardDescription");
    let tagoncard = document.createElement("div");
    tagoncard.classList.add("tagoncard");

    cardHeading.innerHTML = feedbacks.title;
    cardDescription.innerHTML = feedbacks.description;
    tagoncard.innerHTML = feedbacks.category;

    if (feedbacks.category == "UI") {
      tagoncard.classList.add("UI");
    } else if (feedbacks.category == "UX") {
      tagoncard.classList.add("UX");
    } else if (feedbacks.category == "Entertainment") {
      tagoncard.classList.add("Entertainment");
    } else if (feedbacks.category == "Bug") {
      tagoncard.classList.add("Bug");
    } else if (feedbacks.category == "Feature") {
      tagoncard.classList.add("Feature");
    }

    detailscontainer.appendChild(cardHeading);
    detailscontainer.appendChild(cardDescription);
    detailscontainer.appendChild(tagoncard);
    cardDiv.appendChild(detailscontainer);

    let commentcontainer = document.createElement("div");
    commentcontainer.classList.add("commentcount");
    let commenticon = document.createElement("i");
    commenticon.classList.add("bx", "bxs-message-rounded");
    let commentcountno = document.createElement("span");
    commentcountno.classList.add("number-of-comments");
    commentcountno.setAttribute("id", "comment-count-update");

    commentcountno.innerHTML = feedbacks.Comments.length;
    commentcontainer.appendChild(commentcountno);
    commentcontainer.appendChild(commenticon);
    cardDiv.appendChild(commentcontainer);

    board.appendChild(cardDiv);

    upvotecontainer.addEventListener("click", (e) => {
      feedbacks.upvotenumberls += 1;
      //   feedbacks.upvotenumberls = upvote + 1;
      upvotecontainer.classList.add("up-vote-clicked");
      localStorage.setItem("productRequests", JSON.stringify(productRequests));
      DisplayTodos();
    });
    commentcontainer.addEventListener("click", (e) => {
      window.location.href = "./comment page/commntpage.html";
      f_id_token = feedbacks.feedback_id;
      localStorage.setItem("f_id", f_id_token);
    });
  });
  // displaycards(arr);
}
//********************************************************************************************************** */

// function displaycards(arr) {

// }

const updatestatusCounts = () => {
  let Plannedcount = 0;
  let Livecount = 0;
  let InProgresscount = 0;
  productRequests.forEach((feedbacks) => {
    if (feedbacks.Roadmap_status == "Planned") {
      Plannedcount++;
    } else if (feedbacks.Roadmap_status == "Inprogress") {
      InProgresscount++;
    } else if (feedbacks.Roadmap_status == "Live") {
      Livecount++;
    }
  });

  localStorage.setItem("Planned", Plannedcount);
  localStorage.setItem("Live", Livecount);
  localStorage.setItem("InProgress", InProgresscount);

  rmplannedCount.textContent = `${Plannedcount}`;
  rmliveCount.textContent = `${Livecount}`;
  rminprogressCount.textContent = `${InProgresscount}`;
};
//********************************************************************************************************** */
function updatetags() {
  let tagsBtnBox = document.getElementById("tagsbtnbox");
  tagsBtnBox.innerHTML = "";
  productRequests.forEach((feedbacks) => {
    dupeArray.push(feedbacks.category);
  });

  uniqueArray = [...new Set(dupeArray)];
  localStorage.setItem("uniqueArray", uniqueArray);
  let allbtn = document.createElement("button");
  allbtn.classList.add("tagsclick_onclick");
  allbtn.classList.add("tagselected");
  allbtn.setAttribute("id", "ALL");
  allbtn.innerText = "ALL";
  tagsBtnBox.appendChild(allbtn);

  uniqueArray.forEach((index) => {
    let tagBtn = document.createElement("button");
    tagBtn.classList.add("tagsclick_onclick");
    tagBtn.classList.add("tagselected");
    tagBtn.setAttribute("id", `${index}`);
    tagBtn.innerText = `${index}`;
    tagsBtnBox.appendChild(tagBtn);
    allbtn.addEventListener("click", function (e) {
      DisplayTodos();
    });

    tagBtn.addEventListener("click", function (e) {
      let selectedbtn = e.target.innerText;
      const results = [];
      for (const feedback of productRequests) {
        if (feedback.category === selectedbtn) {
          results.push(feedback);
        }
      }
      // resultsfilter(results);
      DisplayTodos(results);
    });
  });
}

//********************************************************************************************************** */
const selectElement = document.getElementById("sortingOptions");

selectElement.addEventListener("change", function () {
  if (selectElement.value === "leastupvoted") {
    leastUpvotedOptionSelected();
  } else if (selectElement.value === "mostupvoted") {
    mostUpvotedOptionSelected();
  }
});

function leastUpvotedOptionSelected() {
  let a = productRequests[0];
  let b = productRequests[1];
  productRequests.sort((a, b) => {
    return a.upvotenumberls - b.upvotenumberls;
  });
  productRequests.forEach((feedbacks) => {
    DisplayTodos();
  });
}

function mostUpvotedOptionSelected() {
  let a = productRequests[0];
  let b = productRequests[1];
  productRequests.sort((a, b) => {
    return b.upvotenumberls - a.upvotenumberls;
  });
  productRequests.forEach((feedbacks) => {
    DisplayTodos();
  });
}

/******************************************************************************************************** */

/******************************************************************************************************** */
