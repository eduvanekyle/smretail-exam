import { Head, router } from '@inertiajs/react';
import { FormEvent, useState } from 'react';
import { login } from '../../routes/auth';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            const response = await fetch(login.url(), {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                setError(data.message ?? 'Login error.');

                return;
            }

            localStorage.setItem('access_token', data.access_token);

            router.visit('/dashboard');
        } catch {
            setError('An unexpected error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Head title="Login" />

            <div className="flex min-h-screen items-center justify-center bg-neutral-100 px-4 py-12">
                <div className="w-full max-w-md space-y-8">
                    <div className="rounded-lg bg-white p-8 shadow-sm">
                        <div className="text-center">
                            <h1 className="mb-6 text-2xl font-bold tracking-tight text-gray-900">SM Retail - Exam</h1>
                        </div>
                        <div className="text-center">{/* <p className="mb-5 text-sm text-gray-600">Enter your credentials to continue</p> */}</div>
                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div className="space-y-1">
                                <label htmlFor="email" className="block text-sm font-bold text-gray-700">
                                    Email address
                                </label>
                                <input
                                    id="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="block w-full border border-gray-200 bg-white px-3 py-3 text-sm text-gray-900 placeholder-gray-400 transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none disabled:opacity-50"
                                    placeholder="you@example.com"
                                    disabled={loading}
                                />
                            </div>

                            <div className="space-y-1">
                                <label htmlFor="password" className="block text-sm font-bold text-gray-700">
                                    Password
                                </label>
                                <input
                                    id="password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="block w-full border border-gray-200 bg-white px-3 py-3 text-sm text-gray-900 placeholder-gray-400 transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none disabled:opacity-50"
                                    placeholder="••••••••••"
                                    disabled={loading}
                                />
                            </div>

                            {error && <p className="text-sm text-red-500">{error}</p>}

                            <button
                                type="submit"
                                disabled={loading}
                                className="text-md flex w-full items-center justify-center rounded-sm bg-primary px-4 py-3 font-semibold text-white shadow-sm transition hover:bg-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                {loading ? (
                                    <>
                                        <svg className="mr-2 h-4 w-4 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                        </svg>
                                        Signing in…
                                    </>
                                ) : (
                                    'Sign in'
                                )}
                            </button>
                        </form>
                    </div>

                    <p className="text-center text-sm text-gray-500">
                        Don't have an account?{' '}
                        <a href="/register" className="font-semibold text-primary hover:underline">
                            Register
                        </a>
                    </p>
                </div>
            </div>
        </>
    );
}
