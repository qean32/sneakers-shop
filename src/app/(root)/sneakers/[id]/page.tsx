import React from 'react'
import { notFound } from 'next/navigation'
import { Container } from '@/components/shared'
import { SneakersForm } from '@/components/shared/sneakers-from'
import { prisma } from '../../../../../prisma/prisma-client'


export default async function ({ params }: any) {
    const { id } = await params
    const sneakers = await prisma.sneakers.findFirst({
        where: {
            id: Number(id)
        },
        include: {
            materials: true,
            Brand: {
                include: {
                    sneakers: {
                        include: {
                            SneakersItem: true
                        }
                    }
                }
            },
            SneakersItem: true
        }
    })

    if (!sneakers) {
        return notFound()
    }


    return (
        <Container className="flex flex-col my-10">
            <SneakersForm sneakers={sneakers} />
        </Container>
    )
}