import React from 'react';
import { Outlet } from 'react-router-dom';

function SimpleLayout() {
    return (
        <div>
            <Outlet /> {/* Isso renderizará apenas o conteúdo da rota sem elementos extras */}
        </div>
    );
}

export default SimpleLayout;