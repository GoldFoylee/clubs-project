import React, { useState } from 'react';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true); // true = Login, false = Sign Up
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [focusedField, setFocusedField] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setFormData({ name: '', email: '', password: '', confirmPassword: '' });
    setShowPassword(false);
    setShowConfirmPassword(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-950 via-emerald-900 to-gray-900 p-4 relative overflow-hidden">
      {/* Animated Background Blobs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-emerald-600 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob"></div>
        <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-amber-600 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-emerald-700 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>

      {/* Main Card */}
      <div className="relative w-full max-w-md bg-black/30 backdrop-blur-2xl rounded-3xl shadow-2xl overflow-hidden border border-emerald-500/20">
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none"></div>

        <div className="relative p-8">
          {/* Logo + Title */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl mb-6 shadow-2xl shadow-emerald-500/50">
              <svg className="w-10 h-10 text-[#FFFFF0] animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
              </svg>
            </div>

            <h1 className="text-5xl font-extrabold text-[#FFFFF0] tracking-tight">
              {isLogin ? 'Club Haven' : 'Join Club Haven'}
            </h1>
            <p className="mt-3 text-[#FFFFF0]/80 text-lg">
              {isLogin ? 'Welcome back to luxury' : 'Become an exclusive member'}
            </p>
          </div>

          <form className="space-y-6">
            {/* Full Name - Only on Sign Up */}
            {!isLogin && (
              <div className="animate-slideIn">
                <label className="block text-sm font-semibold text-[#FFFFF0]/90 mb-2">Full Name</label>
                <div className={`relative group ${focusedField === 'name' ? 'scale-[1.02]' : ''} transition-transform duration-200`}>
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-xl opacity-0 group-hover:opacity-30 blur-lg transition"></div>
                  <svg className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#FFFFF0]/60 group-focus-within:text-emerald-400 transition`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('name')}
                    onBlur={() => setFocusedField(null)}
                    className="w-full pl-12 pr-5 py-4 bg-white/5 border border-emerald-500/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-400 text-[#FFFFF0] placeholder-[#FFFFF0]/50 backdrop-blur-sm transition-all"
                    placeholder="John Doe"
                    required={!isLogin}
                  />
                </div>
              </div>
            )}

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-[#FFFFF0]/90 mb-2">Email Address</label>
              <div className={`relative group ${focusedField === 'email' ? 'scale-[1.02]' : ''} transition-transform duration-200`}>
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-xl opacity-0 group-hover:opacity-30 blur-lg transition"></div>
                <svg className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#FFFFF0]/60 group-focus-within:text-emerald-400 transition`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => setFocusedField(null)}
                  className="w-full pl-12 pr-5 py-4 bg-white/5 border border-emerald-500/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-400 text-[#FFFFF0] placeholder-[#FFFFF0]/50 backdrop-blur-sm transition-all"
                  placeholder="you@clubhaven.com"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-semibold text-[#FFFFF0]/90 mb-2">Password</label>
              <div className={`relative group ${focusedField === 'password' ? 'scale-[1.02]' : ''} transition-transform duration-200`}>
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-xl opacity-0 group-hover:opacity-30 blur-lg transition"></div>
                <svg className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#FFFFF0]/60 group-focus-within:text-emerald-400 transition`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('password')}
                  onBlur={() => setFocusedField(null)}
                  className="w-full pl-12 pr-14 py-4 bg-white/5 border border-emerald-500/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-400 text-[#FFFFF0] placeholder-[#FFFFF0]/50 backdrop-blur-sm transition-all"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#FFFFF0]/60 hover:text-emerald-400"
                >
                  {showPassword ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L6.95 6.95m2.928 2.928L6.95 6.95m2.928 2.928l4.242-4.242" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Confirm Password - Only on Sign Up */}
            {!isLogin && (
              <div className="animate-slideIn">
                <label className="block text-sm font-semibold text-[#FFFFF0]/90 mb-2">Confirm Password</label>
                <div className={`relative group ${focusedField === 'confirmPassword' ? 'scale-[1.02]' : ''} transition-transform duration-200`}>
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-xl opacity-0 group-hover:opacity-30 blur-lg transition"></div>
                  <svg className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#FFFFF0]/60 group-focus-within:text-emerald-400 transition`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('confirmPassword')}
                    onBlur={() => setFocusedField(null)}
                    className="w-full pl-12 pr-14 py-4 bg-white/5 border border-emerald-500/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-400 text-[#FFFFF0] placeholder-[#FFFFF0]/50 backdrop-blur-sm transition-all"
                    placeholder="••••••••"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[#FFFFF0]/60 hover:text-emerald-400"
                  >
                    {showConfirmPassword ? (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L6.95 6.95m2.928 2.928L6.95 6.95m2.928 2.928l4.242-4.242" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-5 mt-8 bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-600 text-[#FFFFF0] font-bold text-lg rounded-xl shadow-lg shadow-emerald-500/50 transform transition-all hover:scale-105 active:scale-95"
            >
              {isLogin ? 'Enter Club Haven' : 'Create Account'}
            </button>
          </form>

          {/* Toggle Link */}
          <div className="mt-10 text-center">
            <p className="text-[#FFFFF0]/70 text-sm">
              {isLogin ? "New to Club Haven? " : "Already have an account? "}
              <button
                onClick={toggleMode}
                className="text-emerald-400 hover:text-emerald-300 font-bold hover:underline transition"
              >
                {isLogin ? 'Join Now' : 'Log In'}
              </button>
            </p>
          </div>
        </div>
      </div>

      {/* Animations */}
      <style jsx>{`
        @keyframes blob {
          0%, 100% { transform: translate(0,0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        .animate-blob { animation: blob 7s infinite; }
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-4000 { animation-delay: 4s; }
        @keyframes slideIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-slideIn { animation: slideIn 0.4s ease-out; }
      `}</style>
    </div>
  );
};

export default AuthPage;