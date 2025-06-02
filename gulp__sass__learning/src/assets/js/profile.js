document.addEventListener('DOMContentLoaded', function() {
    const fileInput = document.getElementById('profile-avatar-select');
    const avatarImg = document.querySelector('.cabinet__avatar img');
    
    const savedImage = localStorage.getItem('userAvatar');
    if (savedImage) {
        avatarImg.src = savedImage;
    }

    fileInput.addEventListener('change', function(e) {
        const file = e.target.files[0];
        
        if (file) {
            if (!file.type.startsWith('image/')) {
                alert('Будь ласка, оберіть файл зображення!');
                return;
            }
            
            const reader = new FileReader();
            
            reader.onload = function(event) {
                avatarImg.src = event.target.result;
                
                localStorage.setItem('userAvatar', event.target.result);
            };
            
            reader.readAsDataURL(file);
        }
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const sidebarAvatar = document.getElementById('sidebar-avatar');
    if (!sidebarAvatar) return;

    const savedImage = localStorage.getItem('userAvatar');
    if (savedImage) {
        sidebarAvatar.src = savedImage;
    }
});