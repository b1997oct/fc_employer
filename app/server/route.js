import dbConnect from "@/lib/db"
import { headers } from "next/headers";
import login from "./login";
import job from "./job";
import team from "./team";
import company from "./company";
import recruiter from "./recruiter";
import appliedjob from "./application";
import user from "./user";
import keyword from "./keyword";
import mail from "./site/mail";
import status from "./status";

const ServerFunction = Object.assign({}, login, mail, team, job, company, recruiter, keyword, appliedjob, user, status)
Object.keys(ServerFunction)
    .forEach(key => {
        let fn = ServerFunction[key]
        delete ServerFunction[key]
        ServerFunction[key.toLowerCase()] = fn;
    });


export async function POST(req) {
    try {
        let head = headers(),
            fn = head.get('Server-Fn')?.toLowerCase()

        let params = await req.json()
        let func = ServerFunction[fn]
        if (!func) {
            return Response.json({ message: 'function not defind' }, { status: 405 })
        }
        await dbConnect()
        const result = await func(...params)
        return Response.json(result)
    } catch (error) {
        let { status = 500, message, href } = error
        console.log('message: ', message);
        return Response.json({ message, href }, { status })
    }
}

