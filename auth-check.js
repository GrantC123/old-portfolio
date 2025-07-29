// Simple authentication check for protected pages
// Include this script in any page that requires authentication

(function() {
    // Configuration
    const supabaseUrl = 'https://yjizrkagqyzftumbkdym.supabase.co';
    const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlqaXpya2FncXl6ZnR1bWJrZHltIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM4MjA0MDksImV4cCI6MjA2OTM5NjQwOX0.BWX7ofphbS47z78OTxe3A0aySfzoAtYkSBExtKEEjgA';
    
    // Skip auth check for login page
    if (window.location.pathname.includes('login.html')) {
        return;
    }
    
    // Note: CSS is already hiding the page via <style id="auth-hide"> in HTML head
    
    // Load Supabase and check authentication
    function loadSupabaseAndCheck() {
        // Check if Supabase is already loaded
        if (window.supabase && window.supabaseClient) {
            checkAuthentication();
            return;
        }
        
        // Load Supabase CDN
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.39.3/dist/umd/supabase.min.js';
        script.onload = function() {
            // Initialize Supabase client
            window.supabaseClient = window.supabase.createClient(supabaseUrl, supabaseAnonKey);
            checkAuthentication();
        };
        script.onerror = function() {
            console.error('Failed to load Supabase');
            redirectToLogin();
        };
        document.head.appendChild(script);
    }
    
    // Check if user is authenticated
    async function checkAuthentication() {
        try {
            const { data: { user }, error } = await window.supabaseClient.auth.getUser();
            
            if (error) {
                console.error('Auth check error:', error);
                redirectToLogin();
                return;
            }
            
            if (user) {
                console.log('User authenticated:', user.email);
                // Show the page by removing the hide style
                const authHideStyle = document.getElementById('auth-hide');
                if (authHideStyle) {
                    authHideStyle.remove();
                }
            } else {
                console.log('No user found, redirecting to login');
                redirectToLogin();
            }
        } catch (error) {
            console.error('Auth check failed:', error);
            redirectToLogin();
        }
    }
    
    // Redirect to login page
    function redirectToLogin() {
        window.location.replace('/login.html');
    }
    
    // Start the authentication check when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', loadSupabaseAndCheck);
    } else {
        loadSupabaseAndCheck();
    }
})(); 