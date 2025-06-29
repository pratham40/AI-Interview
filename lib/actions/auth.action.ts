'use server';

import { auth, db } from "@/firebase/admin";
import { cookies } from "next/headers";

interface SignUpParams {
    uid: string;
    name: string;
    email: string;
    password: string;
}

export async function signUp(params:SignUpParams) {
    const { uid, name, email, password } = params;

    try {
        const userRecord= await db.collection('users').doc(uid).get();

        if (userRecord.exists) {
            return {
                success: false,
                message: "User already exists."
            }
        }

        await db.collection('users').doc(uid).set({
            name,
            email
        })

        return {
            success: true,
            message: "Sign up successful."
        }
    } catch (error) {
        console.error("Error during sign up:", error);
        return {
            success: false,
            message: "Sign up failed. Please try again later."
        }
    }
}

export async function setSessionCokkie(idToken:string) {
    const cookie = await cookies();

    const sessionCookie = await auth.createSessionCookie(idToken,{
        expiresIn: 60 * 60 * 24 * 5 * 1000 
    })

    cookie.set("session",sessionCookie,{
        maxAge: 60 * 60 * 24 * 5 * 1000,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",

    })
}

export async function signIn(email: string,  idToken: string) {
    try {
        const userRecord = await auth.getUserByEmail(email);

        if (!userRecord) {
            return {
                success: false,
                message: "User not found."
            }
        }

        await setSessionCokkie(idToken);

        return {
            success: true,
            message: "Sign in successful."
        }
    } catch (error) {
        console.error("Error during sign in:", error);
        return {
            success: false,
            message: "Sign in failed. Please try again later."
        }
    }
}


export async function getCurrentUser():Promise<any> {
    const cookieStore = await cookies();

    const sessionCookie = cookieStore.get("session")?.value;

    if (!sessionCookie) {
        return null;
    }

    try {
        const decodedToken = await auth.verifySessionCookie(sessionCookie, true);

        const userRecord = await db.collection('users').doc(decodedToken.uid).get();

        if (!userRecord.exists) {
            return null;
        }

        return {
            ...userRecord.data(),
            id: userRecord.id,
        };
    } catch (error) {
        console.error("Error getting current user:", error);
        return null;
    }
}

export async function signOut() {
    const user = await getCurrentUser();
    if (!user) {
        return {
            success: false,
            message: "No user is currently signed in."
        }
    }
    const cookieStore = await cookies();
    cookieStore.delete("session");

    return {
        success: true,
        message: "Signed out successfully."
    }
}

export async function isAuthenticated() {
    const user = await getCurrentUser();
    if (user) {
        return true;
    }
    return false;
}