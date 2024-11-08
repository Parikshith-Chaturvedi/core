import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { Layout } from './components/layout/Layout';
import { LoginForm } from './components/auth/LoginForm';
import { PrivateRoute } from './components/auth/PrivateRoute';
import { LoadingSpinner } from './components/common/LoadingSpinner';

const MusicLibrary = lazy(() => import('musicPlayer/App'));

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <Layout>
          <Suspense fallback={<LoadingSpinner />}>
            <Routes>
              <Route path="/login" element={<LoginForm />} />
              <Route
                path="/"
                element={
                  <PrivateRoute>
                    {(user) => (
                      <MusicLibrary 
                        userRole={user?.role as 'admin' | 'user'}
                        userId={user?.id}
                      />
                    )}
                  </PrivateRoute>
                }
              />
            </Routes>
          </Suspense>
        </Layout>
      </Router>
    </AuthProvider>
  );
};

export default App;