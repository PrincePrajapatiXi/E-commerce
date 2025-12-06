/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: '#ff523b',
                secondary: '#333',
            },
            fontFamily: {
                poppins: ['Poppins', 'sans-serif'],
            },
            keyframes: {
                float: {
                    '0%, 100%': { transform: 'translateY(0px)' },
                    '50%': { transform: 'translateY(-20px)' },
                },
                slideUp: {
                    '0%': { opacity: '0', transform: 'translateY(30px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                fadeIn: {
                    '0%': { opacity: '0', transform: 'translateY(20px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                pulse: {
                    '0%, 100%': { transform: 'scale(1)' },
                    '50%': { transform: 'scale(1.05)' },
                },
                shimmer: {
                    '0%': { backgroundPosition: '-1000px 0' },
                    '100%': { backgroundPosition: '1000px 0' },
                },
                slideDown: {
                    '0%': { opacity: '0', transform: 'translateY(-10px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                }
            },
            animation: {
                float: 'float 3s ease-in-out infinite',
                slideUp: 'slideUp 0.8s ease-out forwards',
                fadeIn: 'fadeIn 0.6s ease-out forwards',
                'pulse-slow': 'pulse 2s ease-in-out infinite',
                shimmer: 'shimmer 2s infinite',
                slideDown: 'slideDown 0.3s ease-out forwards',
            },
            boxShadow: {
                'glow': '0 0 20px rgba(255, 82, 59, 0.3)',
                'glow-lg': '0 0 30px rgba(255, 82, 59, 0.4)',
                'card': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                'card-hover': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
            },
            backgroundImage: {
                'gradient-primary': 'linear-gradient(135deg, #ff523b 0%, #ff7b5f 100%)',
                'gradient-dark': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                'gradient-hero': 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
            }
        },
    },
    plugins: [],
}
