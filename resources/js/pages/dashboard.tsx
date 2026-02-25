import { Head, router } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { profile } from '../routes/auth';

interface Profile {
    first_name: string;
    last_name: string;
    email: string;
    date_of_birth: string;
    age: number;
    password: string;
}

export default function Dashboard() {
    const [user, setUser] = useState<Profile | null>(null);
    const [loading, setLoading] = useState(true);
    const [loggingOut, setLoggingOut] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('access_token');

        if (!token) {
            router.visit('/login');

            return;
        }

        fetch(profile.url(), {
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: 'application/json',
            },
        })
            .then((res) => {
                if (res.status === 401) {
                    localStorage.removeItem('access_token');
                    router.visit('/login');

                    return null;
                }

                return res.json();
            })
            .then((data) => {
                if (data) setUser(data.data);
            })
            .finally(() => setLoading(false));
    }, []);

    const handleLogout = async () => {
        setLoggingOut(true);
        const token = localStorage.getItem('access_token');

        await fetch('/api/auth/logout', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: 'application/json',
            },
        }).catch(() => {});

        localStorage.removeItem('access_token');
        router.visit('/login');
    };

    return (
        <>
            <Head title="Dashboard" />

            <div className="min-h-screen bg-neutral-100">
                <header className="bg-white shadow-sm">
                    <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-4">
                        <h1 className="text-lg font-bold text-gray-900">SM Retail - Exam</h1>
                        <button
                            onClick={handleLogout}
                            disabled={loggingOut}
                            className="rounded-sm bg-primary px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {loggingOut ? 'Logging out…' : 'Logout'}
                        </button>
                    </div>
                </header>

                {/* Content */}
                <main className="mx-auto max-w-4xl px-6 py-10">
                    {loading ? (
                        <div className="flex items-center justify-center py-20">
                            <svg className="h-6 w-6 animate-spin text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                            </svg>
                        </div>
                    ) : user ? (
                        <div className="rounded-lg bg-white p-8 shadow-sm">
                            <h2 className="mb-6 text-xl font-bold text-gray-900">My Profile</h2>

                            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                                <div>
                                    <p className="text-xs font-bold tracking-wide text-gray-400 uppercase">Email address</p>
                                    <p className="mt-1 text-sm font-medium text-gray-900">{user.email}</p>
                                </div>

                                <div>
                                    <p className="text-xs font-bold tracking-wide text-gray-400 uppercase">Password</p>
                                    <p className="mt-1 text-sm font-medium text-gray-900">{user.password}</p>
                                </div>
                                <div>
                                    <p className="text-xs font-bold tracking-wide text-gray-400 uppercase">First name</p>
                                    <p className="mt-1 text-sm font-medium text-gray-900">{user.first_name}</p>
                                </div>

                                <div>
                                    <p className="text-xs font-bold tracking-wide text-gray-400 uppercase">Last name</p>
                                    <p className="mt-1 text-sm font-medium text-gray-900">{user.last_name}</p>
                                </div>

                                <div>
                                    <p className="text-xs font-bold tracking-wide text-gray-400 uppercase">Birthday</p>
                                    <p className="mt-1 text-sm font-medium text-gray-900">{user.date_of_birth}</p>
                                </div>

                                <div>
                                    <p className="text-xs font-bold tracking-wide text-gray-400 uppercase">Age</p>
                                    <p className="mt-1 text-sm font-medium text-gray-900">{user.age} years old</p>
                                </div>
                            </div>
                        </div>
                    ) : null}
                </main>
            </div>
        </>
    );
}
