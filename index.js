function addComment(parentId = null) {
    const commentText = parentId ? document.querySelector(`#reply-input-${parentId}`).value : document.getElementById('new-comment').value;

    if (commentText.trim() === "") return;

    const commentContainer = parentId ? document.querySelector(`#replies-${parentId}`) : document.getElementById('comments-container');

    const comment = document.createElement('div');
    comment.classList.add('comment');
    comment.innerHTML = `
        <p>${commentText}</p>
        <span class="reply-button" onclick="showReplyInput(${Date.now()}, this)">Add a reply</span>
        <div class="replies" id="replies-${Date.now()}"></div>
    `;

    commentContainer.appendChild(comment);

    if (parentId) {
        document.querySelector(`#reply-input-${parentId}`).value = '';
        document.querySelector(`#reply-input-container-${parentId}`).style.display = 'none';
    } else {
        document.getElementById('new-comment').value = '';
    }
}

function showReplyInput(id, element) {
    let replyInputContainer = document.querySelector(`#reply-input-container-${id}`);
    if (!replyInputContainer) {
        replyInputContainer = document.createElement('div');
        replyInputContainer.id = `reply-input-container-${id}`;
        replyInputContainer.classList.add('reply');
        replyInputContainer.innerHTML = `
            <input type="text" id="reply-input-${id}" placeholder="Add a reply...">
            <button onclick="addComment(${id})">Submit</button>
        `;
        element.insertAdjacentElement('afterend', replyInputContainer);
    }
    replyInputContainer.style.display = 'block';
}
