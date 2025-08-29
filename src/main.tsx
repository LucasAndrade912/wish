import './index.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router';

import { PrivateRoutes } from './layouts/PrivateRoutes.tsx';
import { WishlistPage } from './pages/WishlistPage.tsx';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<PrivateRoutes />}>
                    <Route index element={<WishlistPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    </StrictMode>
);
