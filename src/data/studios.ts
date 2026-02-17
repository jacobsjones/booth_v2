import { Studio } from "@/types";

export const studios: Studio[] = [
    {
        id: "neon-beats-sanctuary",
        name: "Neon Beats Sanctuary",
        tagline: "Where rhythm meets light",
        description:
            "A state-of-the-art recording environment bathed in atmospheric neon lighting. Neon Beats Sanctuary offers an immersive creative space designed to inspire artists across all genres. Featuring a curated selection of vintage analog gear alongside cutting-edge digital workstations.",
        location: {
            city: "London",
            area: "Shoreditch",
            address: "42 Rivington St, London EC2A 3LX",
            lat: 51.5265,
            lng: -0.0799,
        },
        pricePerHour: 85,
        rating: 4.9,
        reviewCount: 127,
        sqft: 1200,
        hours: "24/7",
        images: [
            "https://images.unsplash.com/photo-1559170655-905e94be76e3?w=800&q=80",
            "https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=800&q=80",
            "https://images.unsplash.com/photo-1507838153414-b4b713384a76?w=800&q=80",
            "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&q=80",
        ],
        equipment: [
            { category: "Mixing Desk", name: "SSL 4000E Console", icon: "🎛️" },
            { category: "Microphones", name: "Neumann U87 Ai", icon: "🎙️" },
            { category: "Monitoring", name: "ATC SCM45A Pro", icon: "🔊" },
            { category: "Conversion", name: "Universal Audio X16", icon: "⚡" },
        ],
        reviews: [
            {
                id: "r1",
                author: "Marcus V.",
                avatar: "MV",
                rating: 5,
                date: "2 days ago",
                comment:
                    "The low end in this room is incredible. Best mix translation I've had in years. Highly recommend the engineer, Sarah.",
            },
            {
                id: "r2",
                author: "DJ Kaia",
                avatar: "DK",
                rating: 5,
                date: "1 week ago",
                comment:
                    "Perfect vibe for late-night sessions. The neon atmosphere really gets the creative juices flowing. Sound quality is pristine.",
            },
        ],
        amenities: [
            "WiFi",
            "Lounge Area",
            "Kitchen",
            "Parking",
            "24/7 Access",
            "Engineer Available",
        ],
        featured: true,
        popular: true,
    },
    {
        id: "the-echo-chamber",
        name: "The Echo Chamber",
        tagline: "Reverb. Refined.",
        description:
            "Specializing in live recording with naturally beautiful acoustics, The Echo Chamber is a converted Victorian warehouse with soaring ceilings and an unparalleled ambiance for capturing organic sound.",
        location: {
            city: "London",
            area: "Camden",
            address: "18 Chalk Farm Rd, London NW1 8AG",
            lat: 51.5413,
            lng: -0.1466,
        },
        pricePerHour: 120,
        rating: 4.9,
        reviewCount: 94,
        sqft: 2400,
        hours: "8AM - 12AM",
        images: [
            "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=800&q=80",
            "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=800&q=80",
            "https://images.unsplash.com/photo-1507838153414-b4b713384a76?w=800&q=80",
            "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&q=80",
        ],
        equipment: [
            { category: "Mixing Desk", name: "Neve 8078", icon: "🎛️" },
            { category: "Microphones", name: "AKG C414 XLII", icon: "🎙️" },
            { category: "Monitoring", name: "Genelec 8351B", icon: "🔊" },
            { category: "Piano", name: "Steinway Model D", icon: "🎹" },
        ],
        reviews: [
            {
                id: "r4",
                author: "Sarah M.",
                avatar: "SM",
                rating: 5,
                date: "3 days ago",
                comment:
                    "Recorded our album here. The natural reverb in the live room is absolutely magical. Can't recommend enough.",
            },
        ],
        amenities: ["WiFi", "Lounge Area", "Kitchen", "Load-In Bay", "Green Room"],
        featured: true,
        popular: false,
    },
    {
        id: "silverlake-sound",
        name: "Silverlake Sound",
        tagline: "Crystal clear, always",
        description:
            "A boutique mixing and mastering suite with meticulously treated acoustics. Silverlake Sound is the go-to for artists demanding perfection in their final product.",
        location: {
            city: "London",
            area: "Dalston",
            address: "56 Kingsland High St, London E8 2JP",
            lat: 51.5485,
            lng: -0.0754,
        },
        pricePerHour: 65,
        rating: 4.8,
        reviewCount: 68,
        sqft: 600,
        hours: "10AM - 10PM",
        images: [
            "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=800&q=80",
            "https://images.unsplash.com/photo-1563330232-57114bb0823c?w=800&q=80",
            "https://images.unsplash.com/photo-1593697821033-14603947477c?w=800&q=80",
            "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&q=80",
        ],
        equipment: [
            { category: "Mixing Desk", name: "API 2500", icon: "🎛️" },
            { category: "Microphones", name: "Shure SM7B", icon: "🎙️" },
            { category: "Monitoring", name: "Focal Trio11 Be", icon: "🔊" },
            { category: "DAW", name: "Pro Tools Ultimate", icon: "💻" },
        ],
        reviews: [
            {
                id: "r5",
                author: "Luna K.",
                avatar: "LK",
                rating: 4.8,
                date: "5 days ago",
                comment:
                    "Great mixing suite. The acoustics are spot-on and the gear is well-maintained.",
            },
        ],
        amenities: ["WiFi", "Coffee Bar", "Parking"],
        featured: false,
        popular: true,
    },
    {
        id: "vibe-check-studio",
        name: "Vibe Check Studio",
        tagline: "Good vibes only",
        description:
            "A vibrant, creative hub designed for hip-hop, R&B, and pop production. Vibe Check Studio combines a relaxed atmosphere with professional-grade equipment for effortless recording sessions.",
        location: {
            city: "London",
            area: "Brixton",
            address: "23 Atlantic Rd, London SW9 8HX",
            lat: 51.4613,
            lng: -0.1145,
        },
        pricePerHour: 75,
        rating: 4.7,
        reviewCount: 156,
        sqft: 900,
        hours: "24/7",
        images: [
            "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&q=80",
            "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=800&q=80",
            "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=800&q=80",
            "https://images.unsplash.com/photo-1559170655-905e94be76e3?w=800&q=80",
        ],
        equipment: [
            { category: "Mixing Desk", name: "SSL AWS 948", icon: "🎛️" },
            { category: "Microphones", name: "Sony C-800G", icon: "🎙️" },
            { category: "Monitoring", name: "Adam A77X", icon: "🔊" },
            { category: "Synth", name: "Moog Minimoog Model D", icon: "🎹" },
        ],
        reviews: [
            {
                id: "r6",
                author: "Jay P.",
                avatar: "JP",
                rating: 5,
                date: "1 day ago",
                comment:
                    "Best studio for hip-hop in South London. The Sony C-800G is a beast for vocals.",
            },
        ],
        amenities: [
            "WiFi",
            "Lounge Area",
            "Kitchen",
            "24/7 Access",
            "Vocal Booth",
        ],
        featured: false,
        popular: true,
    },
    {
        id: "vintage-analog-room",
        name: "Vintage Analog Room",
        tagline: "Warm tones, timeless sound",
        description:
            "Step back in time with our collection of pristine vintage equipment. The Vintage Analog Room offers an authentic analog recording experience with tape machines, tube compressors, and classic consoles.",
        location: {
            city: "Manchester",
            area: "Northern Quarter",
            address: "78 Oldham St, Manchester M1 1JN",
            lat: 53.4843,
            lng: -2.2349,
        },
        pricePerHour: 95,
        rating: 4.9,
        reviewCount: 82,
        sqft: 1100,
        hours: "9AM - 11PM",
        images: [
            "https://images.unsplash.com/photo-1466428996249-74bef838161f?w=800&q=80",
            "https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=800&q=80",
            "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=800&q=80",
            "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&q=80",
        ],
        equipment: [
            { category: "Tape Machine", name: "Studer A800 MkIII", icon: "📼" },
            { category: "Compressor", name: "Fairchild 670", icon: "🔧" },
            { category: "Console", name: "Trident A-Range", icon: "🎛️" },
            { category: "Reverb", name: "EMT 140 Plate", icon: "🌊" },
        ],
        reviews: [
            {
                id: "r7",
                author: "Indie Band Chris",
                avatar: "IC",
                rating: 5,
                date: "4 days ago",
                comment:
                    "The Fairchild 670 alone is worth the trip. Incredible warmth on everything.",
            },
        ],
        amenities: ["WiFi", "Lounge Area", "Coffee Bar", "Parking"],
        featured: false,
        popular: true,
    },
    {
        id: "the-pod-hub",
        name: "The Pod-Hub",
        tagline: "Podcasting perfected",
        description:
            "Purpose-built podcasting studio with multiple isolated booths, professional lighting rigs, and video recording capabilities. Perfect for content creators and podcasters.",
        location: {
            city: "London",
            area: "Soho",
            address: "14 Wardour St, London W1D 6QE",
            lat: 51.5131,
            lng: -0.1318,
        },
        pricePerHour: 50,
        rating: 4.6,
        reviewCount: 203,
        sqft: 500,
        hours: "8AM - 10PM",
        images: [
            "https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?w=800&q=80",
            "https://images.unsplash.com/photo-1507838153414-b4b713384a76?w=800&q=80",
            "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&q=80",
            "https://images.unsplash.com/photo-1559170655-905e94be76e3?w=800&q=80",
        ],
        equipment: [
            { category: "Microphones", name: "Rode PodMic USB", icon: "🎙️" },
            { category: "Audio Interface", name: "RODECaster Pro II", icon: "🎚️" },
            { category: "Cameras", name: "Sony A7 IV (x3)", icon: "📷" },
            { category: "Lighting", name: "Elgato Key Light Air", icon: "💡" },
        ],
        reviews: [
            {
                id: "r8",
                author: "Podcaster Phil",
                avatar: "PP",
                rating: 4.5,
                date: "2 weeks ago",
                comment:
                    "Super convenient location and great podcast setup. Video quality is fantastic too.",
            },
        ],
        amenities: ["WiFi", "Green Screen", "Teleprompter", "Kitchen"],
        featured: false,
        popular: true,
    },
    {
        id: "frequency-hub",
        name: "Frequency Hub",
        tagline: "Your frequency, amplified",
        description:
            "A modern production facility specializing in electronic music. Frequency Hub is equipped with an extensive collection of synthesizers, drum machines, and modular systems.",
        location: {
            city: "Manchester",
            area: "Ancoats",
            address: "5 Blossom St, Manchester M4 5AF",
            lat: 53.4862,
            lng: -2.229,
        },
        pricePerHour: 70,
        rating: 4.8,
        reviewCount: 91,
        sqft: 850,
        hours: "10AM - 2AM",
        images: [
            "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=800&q=80",
            "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&q=80",
            "https://images.unsplash.com/photo-1559170655-905e94be76e3?w=800&q=80",
            "https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=800&q=80",
        ],
        equipment: [
            { category: "Synth", name: "Sequential Prophet-5", icon: "🎹" },
            { category: "Drum Machine", name: "Roland TR-808", icon: "🥁" },
            { category: "Modular", name: "Eurorack System (200HP)", icon: "🔌" },
            { category: "DAW", name: "Ableton Live Suite", icon: "💻" },
        ],
        reviews: [
            {
                id: "r9",
                author: "Techno Tom",
                avatar: "TT",
                rating: 5,
                date: "1 week ago",
                comment:
                    "The modular setup here is insane. Spent 8 hours and didn't want to leave.",
            },
        ],
        amenities: ["WiFi", "Lounge Area", "DJ Booth", "Late Night Access"],
        featured: false,
        popular: false,
    },
    {
        id: "timber-and-tone",
        name: "Timber & Tone",
        tagline: "Naturally crafted sound",
        description:
            "A beautifully designed studio with extensive wood paneling for warm, natural acoustics. Timber & Tone specializes in acoustic recordings, folk, and jazz.",
        location: {
            city: "Bristol",
            area: "Stokes Croft",
            address: "92 Cheltenham Rd, Bristol BS6 5RH",
            lat: 51.4636,
            lng: -2.5917,
        },
        pricePerHour: 80,
        rating: 4.8,
        reviewCount: 67,
        sqft: 950,
        hours: "9AM - 11PM",
        images: [
            "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=800&q=80",
            "https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=800&q=80",
            "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=800&q=80",
            "https://images.unsplash.com/photo-1507838153414-b4b713384a76?w=800&q=80",
        ],
        equipment: [
            { category: "Console", name: "Audient ASP8024", icon: "🎛️" },
            { category: "Microphones", name: "Coles 4038 (Pair)", icon: "🎙️" },
            { category: "Piano", name: "Yamaha C7 Grand", icon: "🎹" },
            { category: "Guitars", name: "Gibson, Fender Collection", icon: "🎸" },
        ],
        reviews: [
            {
                id: "r10",
                author: "Folk Singer Amy",
                avatar: "FA",
                rating: 5,
                date: "3 days ago",
                comment:
                    "The acoustics in this room are perfect for acoustic guitar. Beautiful space.",
            },
        ],
        amenities: ["WiFi", "Garden Patio", "Coffee Bar", "Instrument Collection"],
        featured: false,
        popular: false,
    },
    {
        id: "grand-central-sound",
        name: "Grand Central Sound",
        tagline: "Where music meets grandeur",
        description:
            "A prestigious, large-format recording studio housed in a converted train station. Grand Central Sound offers cavernous live rooms and a world-class control room for orchestral and large ensemble recordings.",
        location: {
            city: "Birmingham",
            area: "Digbeth",
            address: "150 Fazeley St, Birmingham B5 5SE",
            lat: 52.4759,
            lng: -1.886,
        },
        pricePerHour: 200,
        rating: 5.0,
        reviewCount: 45,
        sqft: 4000,
        hours: "By Appointment",
        images: [
            "https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=800&q=80",
            "https://images.unsplash.com/photo-1507838153414-b4b713384a76?w=800&q=80",
            "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=800&q=80",
            "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&q=80",
        ],
        equipment: [
            { category: "Console", name: "SSL Duality δelta", icon: "🎛️" },
            { category: "Microphones", name: "DPA 4006A (Array)", icon: "🎙️" },
            { category: "Piano", name: "Bösendorfer Imperial", icon: "🎹" },
            { category: "Orchestra", name: "Full Percussion Kit", icon: "🥁" },
        ],
        reviews: [
            {
                id: "r11",
                author: "Conductor James",
                avatar: "CJ",
                rating: 5,
                date: "1 month ago",
                comment:
                    "Recorded a 60-piece orchestra here. The live room acoustics rival Abbey Road. Absolutely stunning.",
            },
        ],
        amenities: [
            "WiFi",
            "Green Room",
            "Catering Available",
            "Load-In Bay",
            "Parking",
        ],
        featured: false,
        popular: false,
    },
    {
        id: "neon-dreams-audio",
        name: "Neon Dreams Audio",
        tagline: "Dream in color, record in clarity",
        description:
            "A visually stunning studio designed for music video shoots and recording. Neon Dreams Audio combines an LED-lit environment with professional audio equipment.",
        location: {
            city: "London",
            area: "Hackney Wick",
            address: "88 Wallis Rd, London E9 5LN",
            lat: 51.5425,
            lng: -0.0247,
        },
        pricePerHour: 90,
        rating: 4.7,
        reviewCount: 112,
        sqft: 1500,
        hours: "24/7",
        images: [
            "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&q=80",
            "https://images.unsplash.com/photo-1559170655-905e94be76e3?w=800&q=80",
            "https://images.unsplash.com/photo-1507838153414-b4b713384a76?w=800&q=80",
            "https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=800&q=80",
        ],
        equipment: [
            { category: "Console", name: "API 1608-II", icon: "🎛️" },
            { category: "Microphones", name: "Telefunken U47", icon: "🎙️" },
            { category: "Cameras", name: "RED Komodo 6K", icon: "📷" },
            { category: "Lighting", name: "Aputure 600d Pro", icon: "💡" },
        ],
        reviews: [
            {
                id: "r12",
                author: "Music Video Director",
                avatar: "MD",
                rating: 4.5,
                date: "5 days ago",
                comment:
                    "Amazing location for music videos. The neon setup saves so much on lighting.",
            },
        ],
        amenities: [
            "WiFi",
            "Video Production",
            "Makeup Room",
            "24/7 Access",
            "Parking",
        ],
        featured: false,
        popular: false,
    },
    {
        id: "sonic-sanctuary-labs",
        name: "Sonic Sanctuary Labs",
        tagline: "Science of sound",
        description:
            "Designed by acoustics mastermind Vincent Van Haaff, Sonic Sanctuary offers a pristine recording environment with a curated selection of vintage analog gear and cutting-edge digital workstations.",
        location: {
            city: "Glasgow",
            area: "Finnieston",
            address: "32 Argyle St, Glasgow G3 8AD",
            lat: 55.8617,
            lng: -4.2834,
        },
        pricePerHour: 85,
        rating: 4.9,
        reviewCount: 73,
        sqft: 1200,
        hours: "24/7",
        images: [
            "https://images.unsplash.com/photo-1559170655-905e94be76e3?w=800&q=80",
            "https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=800&q=80",
            "https://images.unsplash.com/photo-1507838153414-b4b713384a76?w=800&q=80",
            "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&q=80",
        ],
        equipment: [
            { category: "Mixing Desk", name: "SSL 4000E Console", icon: "🎛️" },
            { category: "Microphones", name: "Neumann U87 Ai", icon: "🎙️" },
            { category: "Monitoring", name: "ATC SCM45A Pro", icon: "🔊" },
            { category: "Conversion", name: "Universal Audio X16", icon: "⚡" },
        ],
        reviews: [
            {
                id: "r13",
                author: "Marcus V.",
                avatar: "MV",
                rating: 5,
                date: "2 days ago",
                comment:
                    "The low end in this room is incredible. Best mix translation I've had in years. Highly recommend the engineer, Sarah.",
            },
        ],
        amenities: [
            "WiFi",
            "Lounge Area",
            "Kitchen",
            "Parking",
            "24/7 Access",
            "Engineer Available",
        ],
        featured: false,
        popular: false,
    },
    {
        id: "basement-beats",
        name: "Basement Beats",
        tagline: "Underground sound",
        description:
            "An underground studio with a raw, industrial aesthetic. Basement Beats is the go-to for grime, drill, and experimental artists looking for an authentic recording environment.",
        location: {
            city: "London",
            area: "Peckham",
            address: "15 Rye Lane, London SE15 5BS",
            lat: 51.4732,
            lng: -0.0689,
        },
        pricePerHour: 55,
        rating: 4.6,
        reviewCount: 189,
        sqft: 700,
        hours: "12PM - 4AM",
        images: [
            "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=800&q=80",
            "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&q=80",
            "https://images.unsplash.com/photo-1559170655-905e94be76e3?w=800&q=80",
            "https://images.unsplash.com/photo-1466428996249-74bef838161f?w=800&q=80",
        ],
        equipment: [
            { category: "DAW", name: "FL Studio 21", icon: "💻" },
            { category: "Microphones", name: "Aston Spirit", icon: "🎙️" },
            { category: "Interface", name: "Focusrite Scarlett 18i20", icon: "🎚️" },
            { category: "Monitors", name: "KRK Rokit 8 G4", icon: "🔊" },
        ],
        reviews: [
            {
                id: "r15",
                author: "Grime MC Stormz",
                avatar: "GS",
                rating: 4.8,
                date: "3 days ago",
                comment:
                    "Real underground vibes. Perfect for grime sessions. Staff are proper sound.",
            },
        ],
        amenities: ["WiFi", "Late Night Access", "Vocal Booth"],
        featured: false,
        popular: false,
    },
    {
        id: "highland-harmonics",
        name: "Highland Harmonics",
        tagline: "Where nature meets sound",
        description:
            "A remote recording retreat nestled in the Scottish Highlands, offering a distraction-free environment for artists seeking inspiration from nature. The studio features floor-to-ceiling windows with mountain views.",
        location: {
            city: "Edinburgh",
            area: "Leith",
            address: "64 Constitution St, Edinburgh EH6 6RS",
            lat: 55.9757,
            lng: -3.1697,
        },
        pricePerHour: 110,
        rating: 4.9,
        reviewCount: 39,
        sqft: 1800,
        hours: "8AM - 10PM",
        images: [
            "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=800&q=80",
            "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=800&q=80",
            "https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=800&q=80",
            "https://images.unsplash.com/photo-1507838153414-b4b713384a76?w=800&q=80",
        ],
        equipment: [
            { category: "Console", name: "Neve Genesys Black", icon: "🎛️" },
            { category: "Microphones", name: "Sennheiser MKH 416", icon: "🎙️" },
            { category: "Piano", name: "Fazioli F308", icon: "🎹" },
            { category: "Tape", name: "Ampex ATR-102", icon: "📼" },
        ],
        reviews: [
            {
                id: "r16",
                author: "Singer-Songwriter Ella",
                avatar: "SE",
                rating: 5,
                date: "2 weeks ago",
                comment:
                    "Wrote and recorded my entire EP here. The mountain views from the live room are absolutely inspiring.",
            },
        ],
        amenities: [
            "WiFi",
            "Accommodation",
            "Kitchen",
            "Mountain Views",
            "Parking",
        ],
        featured: false,
        popular: false,
    },
    {
        id: "electric-avenue-studios",
        name: "Electric Avenue Studios",
        tagline: "Electrifying creativity",
        description:
            "A high-energy studio complex with three interconnected rooms. Electric Avenue Studios is built for collaborative sessions, offering separate vocal booths, a live room, and a control room all linked by talkback.",
        location: {
            city: "Birmingham",
            area: "Jewellery Quarter",
            address: "47 Vyse St, Birmingham B18 6HA",
            lat: 52.4892,
            lng: -1.9117,
        },
        pricePerHour: 100,
        rating: 4.7,
        reviewCount: 58,
        sqft: 2000,
        hours: "10AM - 12AM",
        images: [
            "https://images.unsplash.com/photo-1507838153414-b4b713384a76?w=800&q=80",
            "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=800&q=80",
            "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&q=80",
            "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=800&q=80",
        ],
        equipment: [
            { category: "Console", name: "SSL AWS 924", icon: "🎛️" },
            { category: "Microphones", name: "Neumann TLM 103", icon: "🎙️" },
            { category: "Monitoring", name: "Amphion Two18", icon: "🔊" },
            { category: "Effects", name: "Lexicon 480L", icon: "🌊" },
        ],
        reviews: [
            {
                id: "r17",
                author: "Producer Mike",
                avatar: "PM",
                rating: 4.7,
                date: "1 week ago",
                comment:
                    "The three-room setup is perfect for full band sessions. Great workflow.",
            },
        ],
        amenities: [
            "WiFi",
            "Lounge Area",
            "Kitchen",
            "Parking",
            "Multiple Rooms",
        ],
        featured: false,
        popular: false,
    },
    {
        id: "cloudnine-mastering",
        name: "CloudNine Mastering",
        tagline: "Elevate your masters",
        description:
            "A dedicated mastering suite with precision monitoring and a carefully calibrated listening environment. CloudNine Mastering ensures your music sounds perfect on every playback system.",
        location: {
            city: "Bristol",
            area: "Harbourside",
            address: "8 Anchor Rd, Bristol BS1 5TT",
            lat: 51.4508,
            lng: -2.6008,
        },
        pricePerHour: 150,
        rating: 4.9,
        reviewCount: 52,
        sqft: 450,
        hours: "10AM - 8PM",
        images: [
            "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=800&q=80",
            "https://images.unsplash.com/photo-1507838153414-b4b713384a76?w=800&q=80",
            "https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=800&q=80",
            "https://images.unsplash.com/photo-1563330232-57114bb0823c?w=800&q=80",
        ],
        equipment: [
            { category: "EQ", name: "Maselec MEA-2", icon: "🎛️" },
            { category: "Compressor", name: "Manley Vari-Mu", icon: "🔧" },
            { category: "Monitoring", name: "B&W 802 D4", icon: "🔊" },
            { category: "Conversion", name: "Prism Sound ADA-8XR", icon: "⚡" },
        ],
        reviews: [
            {
                id: "r18",
                author: "Label A&R Sophie",
                avatar: "LS",
                rating: 5,
                date: "4 days ago",
                comment:
                    "Our go-to mastering house. Every release comes out sounding incredible. Worth every penny.",
            },
        ],
        amenities: ["WiFi", "Reference Listening", "Coffee Bar"],
        featured: false,
        popular: false,
    },
];

export function getStudioById(id: string): Studio | undefined {
    return studios.find((s) => s.id === id);
}

export function getFeaturedStudios(): Studio[] {
    return studios.filter((s) => s.featured);
}

export function getPopularStudios(): Studio[] {
    return studios.filter((s) => s.popular);
}

export function searchStudios(query?: string, filters?: { category?: string; priceMax?: number; rating?: number }): Studio[] {
    let results = [...studios];

    if (query) {
        const q = query.toLowerCase();
        results = results.filter(
            (s) =>
                s.name.toLowerCase().includes(q) ||
                s.location.city.toLowerCase().includes(q) ||
                s.location.area.toLowerCase().includes(q) ||
                s.description.toLowerCase().includes(q)
        );
    }

    if (filters?.category) {
        const cat = filters.category.toLowerCase();
        if (cat === "recording") {
            results = results.filter((s) => s.equipment.some((e) => e.category.toLowerCase().includes("microphone") || e.category.toLowerCase().includes("console")));
        } else if (cat === "mixing") {
            results = results.filter((s) => s.equipment.some((e) => e.category.toLowerCase().includes("mixing") || e.category.toLowerCase().includes("console")));
        } else if (cat === "mastering") {
            results = results.filter((s) => s.equipment.some((e) => e.category.toLowerCase().includes("eq") || e.category.toLowerCase().includes("compressor")));
        } else if (cat === "podcast") {
            results = results.filter((s) => s.equipment.some((e) => e.category.toLowerCase().includes("camera") || e.name.toLowerCase().includes("podcast")));
        }
    }

    if (filters?.priceMax) {
        results = results.filter((s) => s.pricePerHour <= filters.priceMax!);
    }

    if (filters?.rating) {
        results = results.filter((s) => s.rating >= filters.rating!);
    }

    return results;
}
