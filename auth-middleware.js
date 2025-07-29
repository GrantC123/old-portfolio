// Authentication middleware for protecting pages
import { auth } from './supabase-config.js';

class AuthMiddleware {
  constructor() {
    this.init();
  }

  async init() {
    // Check authentication on page load
    await this.checkAuthOnLoad();
    
    // Listen for auth state changes
    auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_OUT' || !session) {
        this.redirectToLogin();
      }
    });
  }

  async checkAuthOnLoad() {
    // Don't check auth on login page or come-soon page
    if (this.isPublicPage()) {
      return;
    }

    const isAuthenticated = await auth.isAuthenticated();
    
    if (!isAuthenticated) {
      this.redirectToLogin();
    } else {
      // User is authenticated, show the page content
      this.showPageContent();
    }
  }

  isPublicPage() {
    const publicPages = ['/login.html', '/come-soon.html'];
    const currentPath = window.location.pathname;
    
    return publicPages.some(page => 
      currentPath === page || currentPath.endsWith(page)
    );
  }

  redirectToLogin() {
    if (!this.isPublicPage()) {
      window.location.href = '/login.html';
    }
  }

  showPageContent() {
    // Remove any loading states and show main content
    document.body.style.visibility = 'visible';
    
    // Add logout functionality if there's a logout button
    this.addLogoutHandlers();
  }

  addLogoutHandlers() {
    // Add logout functionality to any element with 'logout-btn' class
    const logoutButtons = document.querySelectorAll('.logout-btn');
    
    logoutButtons.forEach(button => {
      button.addEventListener('click', async (e) => {
        e.preventDefault();
        await this.logout();
      });
    });
  }

  async logout() {
    try {
      const { error } = await auth.signOut();
      
      if (error) {
        console.error('Logout error:', error);
      }
      
      // Redirect to login page
      window.location.href = '/login.html';
      
    } catch (error) {
      console.error('Logout failed:', error);
    }
  }

  // Method to get current user info (useful for displaying user info)
  async getCurrentUser() {
    return await auth.getCurrentUser();
  }
}

// Initialize auth middleware when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Hide page content initially to prevent flash of unauthenticated content
  if (!window.location.pathname.includes('login.html') && 
      !window.location.pathname.includes('come-soon.html')) {
    document.body.style.visibility = 'hidden';
  }
  
  new AuthMiddleware();
});

// Export for use in other scripts
window.AuthMiddleware = AuthMiddleware; 