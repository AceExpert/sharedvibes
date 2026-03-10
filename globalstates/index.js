import AmbarLogo from "../assets/images/ambar.jpg"
import LitLogo from "../assets/images/lit.jpg"
import LawLogo from "../assets/images/balance.png"
import CCLogo from "../assets/images/cc.png"

import { messages } from "./messages"

let communityData = [
    {id: 100, name: "Ambar", sdesc: "", ldesc: "Ambar is the LGBTQIA+ resource and ally group of IIT Kharagpur. This is a safe community for all things queer. Everyone is welcome here as long as you don't bring any homophobia, transphobia or any kind of hate with you.",
        owner: "veryshul",
        logo: AmbarLogo,
        protect: true,
        memberCount: 131,
        createdAt: "7th September, 2025",
        tags: ['LGBTQIA+', 'Inclusive', 'Pride', 'Trans', 'Queer', 'Feminist', 'Pro-Choice'],
        channels: {
            updates: [
                {name: 'events', id: 39202},
                {name: 'updates', id: 39203},
                {name: 'news', id: 39204},
            ],
            chats: [
                {name: 'general', id: 49202},
                {name: 'pictures', id: 49203},
                {name: 'pride', id: 49204},
                {name: 'questions', id: 49205},
            ],
            forums: [
                {name: 'General', id: 59202},
                {name: 'HRT', id: 59203},
                {name: 'Gender Identity', id: 59204},
                {name: 'Voice Training', id: 59205},
            ],
        }
    },
    {id: 120, name: "Literary Club", sdesc: "", ldesc: "This community is for all the novelists, poets and anyone who loves to read and write and happens to be at IIT Kharagpur. Discuss literary stuff, novels, books and several other things here!",
        owner: "nivits",
        logo: LitLogo,
        memberCount: 1010,
        createdAt: "2nd April, 2026",
        tags: ['literary', 'novel', 'poem', 'news', 'stories', 'writers', 'love', 'language']
    },
    {id: 130, name: "Coding Cosmos", sdesc: "", ldesc: "This is a community for all the computer programming enthusiasts and those interested in related fields of programming, graphic design, web development, AI/ML, algorithms and anything computer related.",
        owner: "very.anshul",
        logo: CCLogo,
        memberCount: 1310,
        createdAt: "4th March, 2026",
        tags: ['coding', 'programming', 'computer', 'graphics', 'web-dev', 'ai/ml', 'algorithms', 'developers']
    },
    {id: 140, name: "Gymkhana", sdesc: "", ldesc: "Community to raise questions and discuss about all the events and activites taking place at IIT Kharagpur. Get direct updates of changes taking place in the campus and other academic, socult and tech stuff.",
        owner: "someonespecial",
        memberCount: 3310,
        createdAt: "1st February, 2026",
        tags: ['gymkhana', 'activties', 'events', 'socult', 'tech', 'competitions', 'updates']
    },
    {id: 150, name: "School of Lawyers", sdesc: "", ldesc: "Community for all those pursuing LLB, LLM and degrees in related fields of law from Rajiv Gandhi School of Intellectual Property Law. Meet upcoming lawyers, advocates to seek legal help, legal knowledge or find registered patent agents who can help you to get your inventions patented. Everyone is welcome here!",
        owner: "shaleen",
        logo: LawLogo,
        memberCount: 310,
        createdAt: "4th February, 2026",
        tags: ['Inclusive', 'Law', 'Advocate', 'Constitution', 'Lawyer', 'Patent', 'RGSOIPL']
    }
]

export {communityData, messages}