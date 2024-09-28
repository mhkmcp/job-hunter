import React from 'react'

import { Button } from '@/components/ui/button'
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

import { User2, LogOut } from 'lucide-react';


function Navbar() {
    const user = false

    return (
        <div className='bg-white my-2'>
            <div className='flex justify-between items-center mx-auto max-w-7xl h-16'>
                <h1 className='text-2xl font-bold'>Job <span className='text-[#F83002]'>Portal</span></h1>
                <ul className='flex font-medium gap-5'>
                    <li className='mt-2'>Home</li>
                    <li className='mt-2'>Jobs</li>
                    <li className='mt-2'>Browse</li>
                    <li className='mt-2'>Blog</li>
                    <li>
                        {
                            !user ? (
                                <div className='flex flex-row items-center font-medium mt-0'>
                                    <Button className='mr-4 hover:bg-slate-100'>Login</Button>
                                    <Button className='text-white bg-[#6ab7d8] hover:bg-[#4099bf]'>Sign in</Button>
                                </div>
                            ): (
                                <Popover>
                                    <PopoverTrigger>
                                        <Avatar className='max-h-6 max-w-6 mt-2'>
                                            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                                        </Avatar>
                                    </PopoverTrigger>
                                    <PopoverContent className='w-70 mt-7'>
                                        <div className='flex justify-center my-1'>
                                            <Avatar className='max-h-6 max-w-6 justify-center'>
                                                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                                            </Avatar>
                                        </div>
                                        <h2 className='text-pink-900 mx-auto'> Humayun Kabir</h2>
                                        <h5 className='text-muted-foreground text-sm'>Lorem ipsum dolor sit amet consectetur.</h5>
                                        <div className='flex flex-col justify-start gap-0 mt-4'>
                                            <div className='flex'>
                                                <Button variant="link"> <User2 size={16} /> View profile</Button>
                                            </div>
                                            <div className='flex'>
                                                <Button variant="link"> <LogOut size={16} /> Logout</Button>
                                            </div>
                                        </div>
                                    </PopoverContent>
                                </Popover>
                            )
                        }
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Navbar
