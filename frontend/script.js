// Theme Management
const THEMES = ['light', 'dark', 'brota'];
const STORAGE_KEY = 'selected-theme';

// Get stored theme or default to 'light'
function getStoredTheme() {
  return localStorage.getItem(STORAGE_KEY) || 'light';
}

// Apply theme to document
function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  
  // Update active button state
  document.querySelectorAll('.theme-btn').forEach(btn => {
    btn.classList.remove('active');
    if (btn.dataset.theme === theme) {
      btn.classList.add('active');
    }
  });
  
  // Store theme preference
  localStorage.setItem(STORAGE_KEY, theme);
}

// Initialize theme on page load
function initTheme() {
  const savedTheme = getStoredTheme();
  applyTheme(savedTheme);
}

// Handle theme button clicks
function setupThemeSwitcher() {
  document.querySelectorAll('.theme-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const theme = btn.dataset.theme;
      applyTheme(theme);
    });
  });
}

// Handle form submission (simulated)
function setupFormHandler() {
  const form = document.getElementById('loginForm');
  
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    // Simulate login process
    const submitBtn = form.querySelector('.submit-btn');
    const originalText = submitBtn.textContent;
    
    submitBtn.textContent = 'Signing in...';
    submitBtn.disabled = true;
    
    // Simulate API call delay
    setTimeout(() => {
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
      
      // Show success message (in a real app, this would redirect)
      alert(`Login simulated!\n\nEmail: ${email}\nPassword: ${'*'.repeat(password.length)}`);
    }, 1500);
  });
}

// Add subtle input animations
function setupInputEffects() {
  document.querySelectorAll('.form-input').forEach(input => {
    input.addEventListener('focus', () => {
      input.closest('.form-group').classList.add('focused');
    });
    
    input.addEventListener('blur', () => {
      input.closest('.form-group').classList.remove('focused');
    });
  });
}

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  setupThemeSwitcher();
  setupFormHandler();
  setupInputEffects();
});
