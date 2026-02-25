import { Head, router } from '@inertiajs/react';
import { FormEvent, useState } from 'react';
import { register } from '../../routes/auth';

export default function Register() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            const response = await fetch(register.url(), {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
                body: JSON.stringify({
                    first_name: firstName,
                    last_name: lastName,
                    email,
                    date_of_birth: dateOfBirth,
                    password,
                    password_confirmation: passwordConfirmation,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                const firstError = data.errors ? Object.values(data.errors as Record<string, string[]>)[0][0] : data.message;
                setError(firstError ?? 'Registration failed.');
                return;
            }

            router.visit('/login');
        } catch {
            setError('An unexpected error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const inputClass =
        'block w-full border border-gray-200 bg-white px-3 py-3 text-sm text-gray-900 placeholder-gray-400 transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none disabled:opacity-50';
    const labelClass = 'block text-sm font-bold text-gray-700';

    return (
        <>
            <Head title="Register" />

            <div className="flex min-h-screen items-center justify-center bg-neutral-100 px-4 py-12">
                <div className="w-full max-w-md space-y-8">
                    <div className="rounded-lg bg-white p-8 shadow-sm">
                        <div className="text-center">
                            <h1 className="mb-6 text-2xl font-bold tracking-tight text-gray-900">SM Retail - Exam</h1>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div className="flex gap-3">
                                <div className="flex-1 space-y-1">
                                    <label htmlFor="first_name" className={labelClass}>
                                        First name
                                    </label>
                                    <input
                                        id="first_name"
                                        type="text"
                                        autoComplete="given-name"
                                        required
                                        value={firstName}
                                        onChange={(e) => setFirstName(e.target.value)}
                                        className={inputClass}
                                        placeholder="John"
                                        disabled={loading}
                                    />
                                </div>

                                <div className="flex-1 space-y-1">
                                    <label htmlFor="last_name" className={labelClass}>
                                        Last name
                                    </label>
                                    <input
                                        id="last_name"
                                        type="text"
                                        autoComplete="family-name"
                                        required
                                        value={lastName}
                                        onChange={(e) => setLastName(e.target.value)}
                                        className={inputClass}
                                        placeholder="Doe"
                                        disabled={loading}
                                    />
                                </div>
                            </div>

                            <div className="space-y-1">
                                <label htmlFor="email" className={labelClass}>
                                    Email address
                                </label>
                                <input
                                    id="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className={inputClass}
                                    placeholder="you@example.com"
                                    disabled={loading}
                                />
                            </div>

                            <div className="space-y-1">
                                <label htmlFor="date_of_birth" className={labelClass}>
                                    Birthday
                                </label>
                                <input
                                    id="date_of_birth"
                                    type="date"
                                    required
                                    value={dateOfBirth}
                                    onChange={(e) => setDateOfBirth(e.target.value)}
                                    className={inputClass}
                                    disabled={loading}
                                />
                            </div>

                            <div className="space-y-1">
                                <label htmlFor="password" className={labelClass}>
                                    Password
                                </label>
                                <input
                                    id="password"
                                    type="password"
                                    autoComplete="new-password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className={inputClass}
                                    placeholder="••••••••••"
                                    disabled={loading}
                                />
                            </div>

                            <div className="space-y-1">
                                <label htmlFor="password_confirmation" className={labelClass}>
                                    Confirm password
                                </label>
                                <input
                                    id="password_confirmation"
                                    type="password"
                                    autoComplete="new-password"
                                    required
                                    value={passwordConfirmation}
                                    onChange={(e) => setPasswordConfirmation(e.target.value)}
                                    className={inputClass}
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
                                        Creating account…
                                    </>
                                ) : (
                                    'Create account'
                                )}
                            </button>
                        </form>
                    </div>

                    <p className="text-center text-sm text-gray-500">
                        Already have an account?{' '}
                        <a href="/login" className="font-semibold text-primary hover:underline">
                            Sign in
                        </a>
                    </p>
                </div>
            </div>
        </>
    );
}
