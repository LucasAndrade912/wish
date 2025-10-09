import './index.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { PrivateRoutes } from './layouts/PrivateRoutes.tsx';
import { WishlistPage } from './pages/WishlistPage.tsx';
import { LoginPage } from './pages/LoginPage.tsx';
import { SignUpPage } from './pages/SignUpPage.tsx';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <BrowserRouter>
            <QueryClientProvider client={queryClient}>
                <Routes>
                    <Route path="/" element={<PrivateRoutes />}>
                        <Route index element={<WishlistPage />} />
                    </Route>
                    <Route path="/auth/login" element={<LoginPage />} />
                    <Route path="/auth/sign-up" element={<SignUpPage />} />
                </Routes>
            </QueryClientProvider>
        </BrowserRouter>
    </StrictMode>
);
