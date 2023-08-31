/////////////////////////////////////////////////////////////////////////////////////////////////////////
const commentfield = document.getElementById("write-comment");
let postcommentbtn = document.getElementById("postcomment");
let CommentBoard = document.getElementById("all-comment-container");
let commentcountshow = document.getElementById("number-of-comments");
const go_back_btn = document.getElementById("go_back_btn");
// let commentcountfeedback = document.getElementById("comment-count-update");
let commentcount = 0;
let remainingCharsText = document.getElementById("count-of-characters-left");
const MAX_CHARS = 250;
let commentvalue = "";
let commentnestvalue = "";
let feedback_container = document.getElementById("feedback-container");

commentfield.addEventListener("input", function (e) {
  let remaining = MAX_CHARS - commentfield.value.length;
  const color = remaining < MAX_CHARS * 0.1 ? "red" : null;
  // console.log(remaining);
  remainingCharsText.textContent = `${remaining}`;
  remainingCharsText.style.color = color;
  commentvalue = e.target.value;
});

go_back_btn.addEventListener("click", (e) => {
  window.location.href = "../index.html";
});

///================local storage -----------------------------------------------------------------------
let f_id_value = localStorage.getItem("f_id");

window.addEventListener("load", () => {
  // displayfeedbackcard();
  productRequests = JSON.parse(localStorage.getItem("productRequests")) || [];
  postcommentbtn.addEventListener("click", (e) => {
    e.preventDefault();
    const Comments = [];
    const comment = {
      feed_comm_id: f_id_value,
      Comment_Id: new Date().getTime(),
      comment_content: commentvalue,
      user: {
        image: "../download.png",
        name: "James Skinner",
        username: "hummingbird1",
      },
      replies: [],
      commentItemCount: commentcount,
    };
    Comments.push(comment);

    productRequests.forEach((feedback) => {
      if (feedback.feedback_id == comment.feed_comm_id) {
        feedback.Comments.push(comment);
      }
    });
    localStorage.setItem("productRequests", JSON.stringify(productRequests));
    commentvalue = "";

    DisplayComments(e);

    window.location.reload(true);
  });
  displayfeedbackcard();
  DisplayComments();
});

// //************************************************************************************************** */
function DisplayComments(e) {
  CommentBoard.innerHTML = "";
  productRequests.forEach((feedback) => {
    // let f = feedback.feedback_id;
    if (feedback.Comments !== []) {
      feedback.Comments.forEach((comment) => {
        if (comment.feed_comm_id == f_id_value) {
          // productRequests.forEach((feedback) => {
          //   feedback.Comments.forEach((comment) => {
          let commentid = comment.Comment_Id;
          let commentcard = document.createElement("div");
          commentcard.classList.add("commentcard");

          commentcard.setAttribute("id", "commentcard-parent-id");

          let commentcardinner = document.createElement("div");
          commentcardinner.classList.add("commentcardinner");

          let profilepic = document.createElement("div");
          profilepic.classList.add("profilepic");
          let profilepicimg = document.createElement("img");

          profilepicimg.src = `${comment.user.image}`;
          profilepic.appendChild(profilepicimg);
          commentcardinner.appendChild(profilepic);

          let commentbox = document.createElement("div");
          commentbox.classList.add("comment-box");

          let commentby = document.createElement("div");
          commentby.classList.add("commentby");

          let persondetails = document.createElement("div");
          persondetails.classList.add("person-details");

          let personname = document.createElement("div");
          personname.classList.add("person-name");

          let personid = document.createElement("div");
          personid.classList.add("person-id");
          personname.innerHTML = comment.user.name;
          persondetails.appendChild(personname);

          personid.innerHTML = comment.user.username;
          persondetails.appendChild(personid);
          commentby.appendChild(persondetails);

          let reply_btn_box = document.createElement("div");
          reply_btn_box.classList.add("reply-parent");
          reply_btn_box.setAttribute("id", "reply-parent-id");
          let replynode = document.createTextNode("Reply");
          reply_btn_box.appendChild(replynode);
          commentby.appendChild(reply_btn_box);
          commentbox.appendChild(commentby);
          let commenttext = document.createElement("div");
          commenttext.classList.add("comment-text");

          commenttext.innerHTML = comment.comment_content;
          commentbox.appendChild(commenttext);
          commentcardinner.appendChild(commentbox);
          commentcard.appendChild(commentcardinner);
          CommentBoard.appendChild(commentcard);

          reply_btn_box.addEventListener("click", (e) => {
            let nestedcomment = replyparentfunc(
              e,
              commentcard,
              comment.Comment_Id
            );
            commentcard.appendChild(nestedcomment);
          });
          if (comment.replies !== []) {
            comment.replies.forEach((reply) => {
              if (comment.Comment_Id === reply.id) {
                Display_replies(e, commentcard, reply, comment.Comment_Id);
              }
            });
          }
        }
      });
    }
  });
}

//********************* counting number of comment **and**updating on screen  ************************* */
// function countListItems() {
//   itemCount = 0;

//   productRequests.forEach((feedback) => {
//     // let f = feedback.feedback_id;
//     if (feedback.Comments !== []) {
//       feedback.Comments.forEach((comment) => {
//         if (comment.feed_comm_id == f_id_value) {
//           itemCount++;
//         }
//       });
//     }
//   });
//   return itemCount;
// }

// const updateCounts = () => {
//   commentcount = countListItems();

//   commentcountshow.textContent = `${commentcount}`;
//   commentcountfeedback.textContent = `${commentcount}`;
// };

function displayfeedbackcard(arr = productRequests) {
  feedback_container.innerHTML = "";
  arr.forEach((feedbacks) => {
    if (feedbacks.feedback_id == f_id_value) {
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

      feedback_container.appendChild(cardDiv);
      commentcountshow.textContent = feedbacks.Comments.length;
    }
  });
}

// //***************************************************************************************************/

function replyparentfunc(e, commentcards, commentid) {
  // e.preventDefault();
  const nestedcomment = document.createElement("div");
  const nestedcommentfield = document.createElement("input");
  const replybtn = document.createElement("div");
  replybtn.textContent = "Send";
  replybtn.classList.add("add-replynest");
  replybtn.setAttribute("id", "replybtn-id");
  nestedcomment.classList.add("nestedcomment");
  nestedcommentfield.setAttribute("type", "text");
  nestedcommentfield.setAttribute("id", "input-replynest-id");
  nestedcommentfield.setAttribute("class", "input-replynest-class");
  nestedcomment.appendChild(nestedcommentfield);
  nestedcomment.appendChild(replybtn);

  nestedcommentfield.addEventListener("input", function (e) {
    commentnestvalue = e.target.value;
  });

  replybtn.addEventListener("click", function (e) {
    replybtnfunc(e, commentcards, commentid);

    nestedcomment.style.display = "none";
    window.location.reload(true);
  });

  return nestedcomment;
}

function replybtnfunc(e, commentcards, commentid) {
  // e.preventDefault();
  productRequests = JSON.parse(localStorage.getItem("productRequests")) || [];
  debugger;
  const reply = {
    id: commentid,
    ReplycreatedAt: new Date().getTime(),
    Replycomment_content: commentnestvalue,
    user: {
      image: "../download.png",
      name: "Anne Valentine",
      username: "Annev1990",
    },
  };
  productRequests.forEach((feedback) => {
    feedback.Comments.forEach((comment) => {
      if (comment.Comment_Id === reply.id) {
        comment.replies.push(reply);
        // Display_replies(e, commentcards, commentid);
      }
    });
  });
  localStorage.setItem("productRequests", JSON.stringify(productRequests));

  //   replynest.addEventListener("click", function (e) {
  //     e.preventDefault();
  //     //   replyparentfunc(e);
  //   });

  // return commentcardnest;
}

function Display_replies(e, commentcards, reply, commentid) {
  let commentcardnest = document.createElement("div");
  commentcardnest.classList.add("commentcard-nest");

  let profilepicnest = document.createElement("div");
  profilepicnest.classList.add("profilepic-nest");

  let profilepicimgnest = document.createElement("img");

  profilepicimgnest.src = `${reply.user.image}`;

  profilepicnest.appendChild(profilepicimgnest);
  commentcardnest.appendChild(profilepicnest);

  let commentboxnest = document.createElement("div");
  commentboxnest.classList.add("comment-box-nest");

  let commentbynest = document.createElement("div");
  commentbynest.classList.add("commentby-nest");

  let persondetailsnest = document.createElement("div");
  persondetailsnest.classList.add("person-details-nest");

  let personnamenest = document.createElement("div");
  personnamenest.classList.add("person-name-nest");
  personnamenest.innerHTML = reply.user.name;

  let personidnest = document.createElement("div");
  personidnest.classList.add("person-id-nest");
  personidnest.innerHTML = reply.user.username;

  persondetailsnest.appendChild(personnamenest);

  persondetailsnest.appendChild(personidnest);
  commentbynest.appendChild(persondetailsnest);

  let replynest = document.createElement("div");
  replynest.classList.add("reply-nest");
  replynest.setAttribute("id", "reply-nest-id");

  let replynestnode = document.createTextNode("SEND");
  replynest.appendChild(replynestnode);
  commentbynest.appendChild(replynest);
  commentboxnest.appendChild(commentbynest);
  let commenttextnest = document.createElement("div");
  commenttextnest.classList.add("comment-text-nest");
  commenttextnest.innerHTML = reply.Replycomment_content;

  commentboxnest.appendChild(commenttextnest);
  commentcardnest.appendChild(commentboxnest);

  commentcards.appendChild(commentcardnest);
}
