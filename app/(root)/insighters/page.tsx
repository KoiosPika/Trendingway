import Image from 'next/image'
import Link from 'next/link';
import React from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select"
import { getTopUsers } from '@/lib/actions/userData.actions';
import { IUserData } from '@/lib/database/models/userData.model';
import TopInsighters from '@/components/shared/TopInsighters';


const page = async () => {

    const users = await getTopUsers()

    return (
        <TopInsighters />
    )
}

export default page