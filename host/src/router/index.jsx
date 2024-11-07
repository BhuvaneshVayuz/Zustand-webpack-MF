import React, { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import Main from "../Main";

const DataPage = lazy(() => import("../components/Data/DataPage"));
const Home = lazy(() => import("../components/Home"));
const LoginWrapper = lazy(() => import("../components/LoginWrapper"));
const AddDataWrapper = lazy(() => import("../components/AddData"));
const EditDataWrapper = lazy(() => import("../components/EditData"));
const DataViewWrapper = lazy(() => import("../components/DataViewWrapper"));
const NotFound = lazy(() => import("../components/NotFound"));
const SignUpWrapper = lazy(() => import("../components/SignUpWrapper/Index"));

const router = createBrowserRouter(
    [
        {
            path: "/",
            element: (
                <Suspense fallback={<div>Loading...</div>}>
                    <Main />
                </Suspense>
            ),
            children: [
                {
                    index: true,
                    element: (
                        <Suspense fallback={<div>Loading Home...</div>}>
                            <Home />
                        </Suspense>
                    ),
                },
                {
                    path: 'data',
                    element: (
                        <Suspense fallback={<div>Loading Data...</div>}>
                            <DataPage />
                        </Suspense>
                    ),
                },
                {
                    path: 'data/add',
                    element: (
                        <Suspense fallback={<div>Loading Add Data...</div>}>
                            <AddDataWrapper />
                        </Suspense>
                    ),
                },
                {
                    path: 'data/view/:id',
                    element: (
                        <Suspense fallback={<div>Loading Data View...</div>}>
                            <DataViewWrapper />
                        </Suspense>
                    ),
                },
                {
                    path: 'data/edit/:id',
                    element: (
                        <Suspense fallback={<div>Loading Edit Data...</div>}>
                            <EditDataWrapper />
                        </Suspense>
                    ),
                },
            ]
        },
        {
            path: '/login',
            element: (
                <Suspense fallback={<div>Loading Login...</div>}>
                    <LoginWrapper />
                </Suspense>
            ),
        },
        {
            path: '/signUp',
            element: (
                <Suspense fallback={<div>Loading Sign Up...</div>}>
                    <SignUpWrapper />
                </Suspense>
            ),
        },
        {
            path: '*',
            element: (
                <Suspense fallback={<div>Loading Not Found...</div>}>
                    <NotFound />
                </Suspense>
            ),
        },
    ]
);

export default router;
