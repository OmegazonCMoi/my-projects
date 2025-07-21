'use client'

import { Card } from "@/components/ui/card";
import { Button } from "ui";
import Image from "next/image";
import { sites } from "@/data/sites";

export default function Home() {
    return (
        <div className='max-w-5xl mx-auto items-center justify-center min-h-screen flex flex-col mt-[10em]'>
            <h1 className='text-[75px] mb-8' style={{ fontFamily: "Darlington" }}>My Projects</h1>
            <div id='list' className='w-full grid grid-cols-1 md:grid-cols-3 px-10 lg:px-0 gap-4'>
                {sites.map(site => (
                    <Card key={site.id} className='h-full flex flex-col'>
                        <Card.Header>
                            <Card.Title>{site.name}</Card.Title>
                            <Card.Description>{site.description}</Card.Description>
                        </Card.Header>
                        <Card.Content className='flex-1'>
                            <Image src={site.image} alt={site.name} height={2500} width={4000} className='rounded-lg w-full h-auto object-contain' />
                        </Card.Content>
                        <Card.Footer className='mt-auto'>
                            <a href={site.url}><Button intent={'outline'}>Discover</Button></a>
                        </Card.Footer>
                    </Card>
                ))}
            </div>
        </div>
    );
}
