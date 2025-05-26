document.addEventListener('DOMContentLoaded', () => {
    const contentForm = document.getElementById('contentForm');
    
    contentForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Get form inputs by ID
        const post_title = document.getElementById('post_title').value;
        const post_description = document.getElementById('post_description').value;
        const post_content = document.getElementById('post_content').value;
        const post_date = new Date().toISOString();

        console.log("Submitting:", { post_title, post_description, post_content, post_date });

        try {
            const response = await fetch('/api/posts', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
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
            console.log("Success:", result);

            // Close the Bootstrap modal after successful submission
            const modal = bootstrap.Modal.getInstance(document.getElementById('contentModal'));
            modal.hide();

            // Reset the form
            contentForm.reset();

            // Optional: Show success message
            alert('Post created successfully!');
            
        } catch (error) {
            console.error("Error:", error);
            alert("Failed to create post. Please try again.");
        }
    });
});