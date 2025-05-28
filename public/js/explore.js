document.addEventListener('DOMContentLoaded', () => {
    const contentForm = document.getElementById('contentForm');
    const postsContainer = document.querySelector('.row.row-cols-1.row-cols-md-3.g-4');

    // Fetch and render posts
    async function loadPosts() {
        try {
            const response = await fetch('/api/post');
            if (!response.ok) throw new Error('Failed to fetch posts');
            const data = await response.json();
            const posts = data.data;
            postsContainer.innerHTML = ""; // Clear existing cards

            posts.forEach(post => {
                const card = document.createElement('div');
                card.className = 'col';

                // Format date for display
                const formattedDate = new Date(post.post_date).toLocaleString();

                // Get current user
                const currentUser = JSON.parse(localStorage.getItem("user"));
                const isOwner = currentUser && currentUser.user_id === post.user_id;
                card.innerHTML = `
                    <div class="card h-100 border-0 shadow-sm d-flex flex-column">
                        <img src="../images/header-img.jpg" class="card-img-top" alt="..." style="height: 200px; object-fit: cover;">
                        <div class="card-body d-flex flex-column">
                            <h5 class="card-title">${post.post_title}</h5>
                            <p class="card-text text-muted mb-1" style="font-size: 0.9em;">
                                <strong>By:</strong> ${post.username || "Unknown"}
                            </p>
                            <p class="card-text">${post.post_description}</p>
                            <p class="card-text text-muted mb-2" style="font-size: 0.85em;">
                                <i class="bi bi-heart-fill text-danger like-btn" data-id="${post.post_id}" style="cursor:pointer;"></i>
                                <span class="like-count" id="like-count-${post.post_id}">${post.like_count || 0}</span>
                            </p>
                            <div class="mt-auto d-flex gap-2">
                                <button class="btn btn-primary read-more-btn w-100"
                                    data-id="${post.post_id}"
                                    data-title="${post.post_title}"
                                    data-description="${post.post_description}"
                                    data-content="${post.post_content}"
                                    data-date="${post.post_date}"
                                    data-username="${post.username}"
                                    data-bs-toggle="modal"
                                    data-bs-target="#readMoreModal">
                                    Read more
                                </button>
                                ${isOwner ? `
                                    <button class="btn btn-warning edit-btn" data-id="${post.post_id}">Edit</button>
                                    <button class="btn btn-danger delete-btn" data-id="${post.post_id}">Delete</button>
                                ` : ''}
                            </div>
                        </div>
                    </div>
                `;
                postsContainer.appendChild(card);
            });
        } catch (error) {
            postsContainer.innerHTML = "<p class='text-danger'>Could not load posts.</p>";
            console.error(error);
        }
    }

    // Call loadPosts on page load
    loadPosts();

    // Form submit handler
    contentForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const post_title = document.getElementById('post_title').value;
        const post_description = document.getElementById('post_description').value;
        const post_content = document.getElementById('post_content').value;
        const post_date = new Date().toISOString();

        try {
            const user = JSON.parse(localStorage.getItem("user"));
            const token = user?.token;
            const user_id = user.user_id;
            const response = await fetch('/api/post', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    user_id,
                    post_title,
                    post_description,
                    post_content,
                    post_date
                }),
            });
            if (!response.ok) {
                throw new Error(`Server error: ${response.status}`);
            }

            const result = await response.json();
            // Close the Bootstrap modal after successful submission
            const modal = bootstrap.Modal.getInstance(document.getElementById('contentModal'));
            modal.hide();

            // Reset the form
            contentForm.reset();

            // Reload posts
            loadPosts();

            // Optional: Show success message
            alert('Post created successfully!');
        } catch (error) {
            console.error("Error:", error);
            alert("Failed to create post. Please try again.");
        }

    // After successful post creation and modal close:
    const toastEl = document.getElementById('postToast');
    const toast = new bootstrap.Toast(toastEl, { delay: 1000 }); // 3 seconds
    document.getElementById('toastMessage').textContent = 'Post created successfully!';
    toast.show();
    });

    document.body.addEventListener('click', function (e) {
        if (e.target.classList.contains('read-more-btn')) {
            // Fill modal with post data from button's data attributes
            document.getElementById('readMoreModalLabel').textContent = e.target.dataset.title;
            document.getElementById('modalCardTitle').textContent = e.target.dataset.title;
            document.getElementById('modalCardDate').textContent = e.target.dataset.created;
            document.getElementById('modalCardDescription').textContent = e.target.dataset.description;
            document.getElementById('modalCardText').textContent = e.target.dataset.content;
            document.getElementById('modalImage').src = "../images/header-img.jpg"; // or use a post-specific image if available
        }
    });
    
});