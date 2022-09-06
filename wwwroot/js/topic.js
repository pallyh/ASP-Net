document.addEventListener("DOMContentLoaded", function () {
    const buttonPublish = document.getElementById("button-publish");
    if (buttonPublish) buttonPublish.onclick = buttonPublishClick;
    loadArticles();
});

function buttonPublishClick(e) {
    const articleText = document.getElementById("article-text");
    if (!articleText) throw "article-text element not found";
    const picture = document.querySelector("input[name=picture]");
    if (!picture) throw "picture element not found";

    const txt = articleText.value;
    const authorId = articleText.getAttribute("data-author-id");
    const topicId = articleText.getAttribute("data-topic-id");
    let replyId = articleText.getAttribute("data-reply-id");
    if (replyId.length < 5) replyId = "";

    // console.log(txt, authorId, topicId, picture.files);
    
    /*console.log(authorId,topicId,txt,moment);*/
    const formData = new FormData();
    formData.append('TopicId', topicId);
    formData.append('AuthorId', authorId);
    formData.append('ReplyId', replyId);
    formData.append('Text', txt);
    if (picture.files.length > 0) {
        formData.append('Picture', picture.files[0]);
    }
    fetch("/api/article", {
        method: "POST",
        body: formData
    }).then(r => r.json())
        .then(j => {
            if (j.status == "Ok") {
                articleText.value = "";   // Clear message field
                articleText.setAttribute("data-reply-id", "");   // Clear reply-id

                loadArticles();
            }
            else alert(j.message);
        });
}

function loadArticles() {
    const articles = document.querySelector("articles");
    if (!articles) throw "articles element not found";

    let tplPromise = fetch("/templates/article.html");

    const articleText = document.getElementById("article-text");
    const authorId = (articleText)
        ? articleText.getAttribute("data-author-id")
        : "-";
    /*console.log(topicId);*/
    const id = articles.getAttribute("topic-id");
    fetch(`/api/article/${id}`)
        .then(r => r.json())
        .then(async j => {
            console.log(j);
            var html = "";
            const tpl = await tplPromise.then(r => r.text());
            for (let article of j) {
                const moment = new Date(article.createdDate);
                html +=
                    tpl.replaceAll("{{author}}", article.author.realName)
                        .replaceAll("{{text}}", article.text)
                        .replaceAll("{{avatar}}",
                            (article.author.avatar == null
                                ? "no-avatar.png"
                                : article.author.avatar))
                        .replaceAll("{{moment}}",
                            moment.toLocaleString("uk-UA"))
                        .replaceAll("{{id}}", article.id)
                        .replaceAll("{{reply}}",
                            (article.replyId == null
                                ? ""
                                : `<b>${article.reply.author.realName}</b>: `
                                + article.reply.text.substring(0, 13)
                                + (article.reply.text.length > 13 ? "..." : "")
                            ))
                        .replaceAll("{{picture}}",
                            (article.pictureFile == null
                                ? "no-picture.png"
                                : article.pictureFile))
                        .replace("{{del-display}}", /*Тут какоето дз*/
                            (article.authorId == authorId
                                ? "inline-block"
                                : "none"))
                        .replace("{{ins-display}}",/*Кнопка удаления (стиль дисплей)*/
                            (article.authorId == authorId
                                ? "inline-block"
                                : "none"))
                    ;
            }
            articles.innerHTML = html;
            onArticlesLoaded();
        });
}

function onArticlesLoaded() {
    // span - reply
    for (let span of document.querySelectorAll(".article span")) {
        span.onclick = replyClick;
    }
    // del
    for (let del of document.querySelectorAll(".article del")) {
        del.onclick = delClick;
    }
    // ins - del
    for (let ins of document.querySelectorAll(".article ins")) {
        ins.onclick = insClick;
    }
}

function replyClick(e) {
    const id = e.target.closest(".article").getAttribute("data-id");
    // console.log(id);
    const articleText = document.getElementById("article-text");
    if (!articleText) throw "article-text element not found";
    articleText.setAttribute("data-reply-id", id);
    articleText.focus();
}

function delClick(e) {
    const id = e.target.closest(".article").getAttribute("data-id");
    if (confirm(`Delete article ${id}?`)) {
        // console.log(id);
        fetch(`/api/article/${id}`, {
            method: "DELETE"
        }).then(r => r.json())
            .then(j => {
                if (j.status == "Ok") {
                    e.target.closest(".article").style.display = 'none';
                }
            });
    }
}
function insClick(e) {
    const article = e.target.closest(".article");
    const p = article.querySelector("p");

    if (p.getAttribute("contenteditable")) {/*уже редактируется*/
        e.target.style.color = "orange";
        e.target.style.border = "none";
        p.removeAttribute("contenteditable");
        if (p.innerText != p.savedContent) {
            if (confirm("Save changes")) {
                const id = article.getAttribute("data-id");

                fetch(`/api/article/${id}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type":"application/json"
                    },
                    body: JSON.stringify(p.innerText)
                }).then(r => r.json())
                    .then(j => {
                        console.log(j)
                        if (j.status == "Ok") {
                            alert("Change saved");
                        }
                        else {
                            alert(j.message);
                            p.innerText = p.savedContent;
                        }
                    });

            }
        }
    }
    else {/*Начало редактирования*/
        e.target.style.color = "lime";
        e.target.style.border = "1px solid red";
        p.setAttribute("contenteditable", "true");
        p.savedContent = p.innerText;
        p.focus();
    }


    /*
    const id = e.target.closest(".article").getAttribute("data-id");
   */
}
