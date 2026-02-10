import Link from 'next/link';
import type { Metadata } from 'next';
import DetailPageWrapper from '@/components/animations/DetailPageWrapper';
import {
    Rocket, Sprout, Car, Plane, Landmark, FlaskConical, Smartphone, ShoppingBag,
    Shield, GraduationCap, Zap, Building2, Stethoscope, Cpu, Building, FileText,
    Scale, Dna, Truck, Factory, Film, Pickaxe, Heart, Flame, Pill, Briefcase,
    Sun, ShoppingCart, Microchip, Trophy, Radio, Train, Globe, PawPrint, Package,
    Recycle, Droplets, ArrowRight, CheckCircle, AlertCircle, ChevronRight
} from 'lucide-react';

const industryData: Record<string, {
    name: string;
    icon: any;
    description: string;
    content: string;
    challenges: string[];
    solutions: string[];
    relatedServices: string[];
}> = {
    'aerospace': { name: 'Aerospace', icon: Rocket, description: 'AI-powered solutions for the aerospace industry, from supply chain optimization to predictive maintenance.', content: 'We deliver cutting-edge technology solutions for aerospace companies, enabling smarter manufacturing, connected aircraft systems, and defense-grade cybersecurity.', challenges: ['Supply Chain Complexity', 'Regulatory Compliance', 'Predictive Maintenance', 'Digital Thread Integration'], solutions: ['IoT-enabled Asset Tracking', 'AI Predictive Analytics', 'Digital Twin Simulation', 'Cybersecurity Frameworks'], relatedServices: ['Data, Analytics & AI', 'IoT & Connected Products', 'Cybersecurity', 'Digital Engineering'] },
    'agriculture': { name: 'Agriculture', icon: Sprout, description: 'Smart farming solutions powered by IoT, AI, and data analytics for precision agriculture.', content: 'We help agricultural enterprises adopt smart farming technologies that optimize yields, reduce waste, and enable sustainable practices.', challenges: ['Climate Variability', 'Resource Optimization', 'Supply Chain Visibility', 'Sustainability Goals'], solutions: ['Precision Agriculture Platforms', 'IoT Sensor Networks', 'AI Crop Analytics', 'Blockchain Traceability'], relatedServices: ['IoT & Connected Products', 'Data, Analytics & AI', 'Cloud Services', 'Blockchain & Web3'] },
    'automotive-mobility': { name: 'Automotive & Mobility', icon: Car, description: 'Digital transformation for automotive OEMs, suppliers, and mobility companies.', content: 'We partner with automotive companies to build connected vehicles, autonomous driving systems, and next-generation mobility platforms.', challenges: ['EV Transition', 'Connected Vehicles', 'Autonomous Driving', 'Customer Experience'], solutions: ['ADAS/AD Software', 'Connected Car Platforms', 'EV Battery Analytics', 'Smart Factory Solutions'], relatedServices: ['Digital Engineering', 'IoT & Connected Products', 'Data, Analytics & AI', 'Cloud Services'] },
    'aviation': { name: 'Aviation', icon: Plane, description: 'Technology solutions for airlines, airports, and aviation service providers.', content: 'We help aviation stakeholders improve operational efficiency, passenger experience, and safety through digital transformation.', challenges: ['Operational Efficiency', 'Passenger Experience', 'Safety Compliance', 'Revenue Management'], solutions: ['Airport Management Systems', 'Crew Scheduling AI', 'Passenger Experience Apps', 'Predictive Maintenance'], relatedServices: ['Application Services', 'Data, Analytics & AI', 'Cloud Services', 'Digital Experience & Design'] },
    'banking-finance': { name: 'Banking & Finance', icon: Landmark, description: 'Digital banking solutions, fintech innovation, and regulatory technology for financial institutions.', content: 'We enable financial institutions to innovate faster with cloud-native platforms, AI-driven risk management, and seamless digital experiences.', challenges: ['Regulatory Compliance', 'Fraud Detection', 'Digital Banking', 'Legacy Modernization'], solutions: ['Core Banking Modernization', 'AI Fraud Detection', 'Open Banking APIs', 'Robotic Process Automation'], relatedServices: ['Application Services', 'Data, Analytics & AI', 'Cybersecurity', 'Cloud Services'] },
    'chemical-manufacturing': { name: 'Chemical Manufacturing', icon: FlaskConical, description: 'Digital solutions for chemical companies focusing on safety, efficiency, and sustainability.', content: 'We help chemical manufacturers optimize processes, ensure safety compliance, and drive sustainability through technology.', challenges: ['Process Safety', 'Environmental Compliance', 'Supply Chain Optimization', 'Digital Factory'], solutions: ['Process Control Systems', 'Environmental Monitoring', 'Supply Chain Analytics', 'Predictive Maintenance'], relatedServices: ['IoT & Connected Products', 'Data, Analytics & AI', 'Enterprise Resource Planning', 'Cloud Services'] },
    'communication-telecom': { name: 'Communication & Telecom', icon: Smartphone, description: 'Network transformation and digital services for telecom operators and communication providers.', content: 'We help telecom companies modernize networks, launch digital services, and improve customer experience.', challenges: ['5G Deployment', 'Network Virtualization', 'Customer Churn', 'Revenue Growth'], solutions: ['5G Network Solutions', 'AI Network Optimization', 'Customer Analytics', 'Digital Service Platforms'], relatedServices: ['Cloud Services', 'Data, Analytics & AI', 'Infrastructure Modernization', 'Digital Engineering'] },
    'consumer-goods': { name: 'Consumer Goods', icon: ShoppingBag, description: 'Technology solutions for CPG companies to drive growth and consumer engagement.', content: 'We help consumer goods companies leverage data, AI, and digital channels to understand consumers and drive growth.', challenges: ['Consumer Insights', 'Supply Chain Agility', 'Direct-to-Consumer', 'Sustainability'], solutions: ['Consumer Analytics Platforms', 'Supply Chain Optimization', 'D2C Commerce', 'Sustainability Tracking'], relatedServices: ['Data, Analytics & AI', 'Digital Experience & Design', 'Cloud Services', 'Business Process Automation'] },
    'defense': { name: 'Defense', icon: Shield, description: 'Secure technology solutions for defense organizations and military applications.', content: 'We deliver mission-critical technology solutions for defense organizations, ensuring security, reliability, and operational superiority.', challenges: ['Cybersecurity Threats', 'Data Sovereignty', 'System Integration', 'Modernization'], solutions: ['Secure Cloud Infrastructure', 'AI Surveillance Systems', 'Command & Control Platforms', 'Zero Trust Architecture'], relatedServices: ['Cybersecurity', 'Cloud Services', 'Data, Analytics & AI', 'Infrastructure Modernization'] },
    'education': { name: 'Education', icon: GraduationCap, description: 'EdTech solutions for universities, schools, and online learning platforms.', content: 'We build innovative education technology solutions that enhance learning outcomes and operational efficiency.', challenges: ['Digital Learning', 'Student Engagement', 'Administrative Efficiency', 'Data Privacy'], solutions: ['LMS Platforms', 'AI Tutoring Systems', 'Student Analytics', 'Campus Management'], relatedServices: ['Application Services', 'Data, Analytics & AI', 'Cloud Services', 'Digital Experience & Design'] },
    'energy-utilities': { name: 'Energy & Utilities', icon: Zap, description: 'Smart grid solutions, asset management, and customer engagement for energy companies.', content: 'We help energy companies modernize grids, optimize asset performance, and engage customers through digital transformation.', challenges: ['Grid Modernization', 'Renewable Integration', 'Asset Management', 'Customer Experience'], solutions: ['Smart Grid Analytics', 'Renewable Energy Management', 'Predictive Asset Maintenance', 'Customer Portals'], relatedServices: ['IoT & Connected Products', 'Data, Analytics & AI', 'Cloud Services', 'Digital Engineering'] },
    'government': { name: 'Government', icon: Building2, description: 'Digital government solutions for citizen services, efficiency, and transparency.', content: 'We help government agencies deliver better citizen services, improve operational efficiency, and ensure data security.', challenges: ['Citizen Experience', 'Legacy Systems', 'Data Security', 'Interoperability'], solutions: ['Citizen Service Portals', 'Legacy Modernization', 'Data Analytics Platforms', 'Cybersecurity Solutions'], relatedServices: ['Application Services', 'Cloud Services', 'Cybersecurity', 'Infrastructure Modernization'] },
    'healthcare': { name: 'Healthcare', icon: Stethoscope, description: 'Digital health solutions for hospitals, clinics, and healthcare networks.', content: 'We deliver HIPAA-compliant healthcare IT solutions that improve patient outcomes, operational efficiency, and clinical decision-making.', challenges: ['Interoperability', 'Patient Experience', 'Data Security', 'Clinical Analytics'], solutions: ['EHR Integration', 'Telehealth Platforms', 'Clinical Decision Support', 'Patient Engagement Apps'], relatedServices: ['Application Services', 'Data, Analytics & AI', 'Cybersecurity', 'Cloud Services'] },
    'high-technology': { name: 'High Technology', icon: Cpu, description: 'Technology solutions for tech companies to accelerate innovation and growth.', content: 'We partner with technology companies to build next-generation products, scale platforms, and accelerate go-to-market.', challenges: ['Rapid Innovation', 'Platform Scalability', 'Talent Gap', 'Market Competition'], solutions: ['Product Engineering', 'Platform Modernization', 'AI/ML Integration', 'DevOps Excellence'], relatedServices: ['Digital Engineering', 'Cloud Services', 'Data, Analytics & AI', 'Quality Engineering & Testing'] },
    'hospitality-tourism': { name: 'Hospitality & Tourism', icon: Building, description: 'Guest experience and operational solutions for hotels, resorts, and travel companies.', content: 'We help hospitality companies deliver personalized guest experiences and optimize operations through technology.', challenges: ['Guest Personalization', 'Revenue Management', 'Operational Efficiency', 'Digital Booking'], solutions: ['Guest Experience Platforms', 'Revenue Optimization', 'Property Management Systems', 'Mobile Concierge Apps'], relatedServices: ['Digital Experience & Design', 'Data, Analytics & AI', 'Cloud Services', 'Application Services'] },
    'insurance': { name: 'Insurance', icon: FileText, description: 'InsurTech solutions for carriers, brokers, and managing general agents.', content: 'We help insurance companies modernize core systems, leverage AI for underwriting, and deliver digital-first customer experiences.', challenges: ['Legacy Core Systems', 'Claims Processing', 'Fraud Detection', 'Customer Expectations'], solutions: ['Core System Modernization', 'AI Underwriting', 'Claims Automation', 'Digital Distribution'], relatedServices: ['Application Services', 'Data, Analytics & AI', 'Business Process Automation', 'Cloud Services'] },
    'legal-services': { name: 'Legal Services', icon: Scale, description: 'LegalTech solutions for law firms and corporate legal departments.', content: 'We build technology solutions that help legal professionals work more efficiently and deliver better client outcomes.', challenges: ['Document Management', 'Contract Analysis', 'Billing Efficiency', 'Knowledge Management'], solutions: ['AI Contract Review', 'Legal Research Tools', 'Practice Management', 'E-Discovery Platforms'], relatedServices: ['Generative AI Solutions', 'Data, Analytics & AI', 'Application Services', 'Business Process Automation'] },
    'life-sciences': { name: 'Life Sciences', icon: Dna, description: 'Technology solutions for pharma, biotech, and medical device companies.', content: 'We help life sciences companies accelerate drug discovery, streamline clinical trials, and ensure regulatory compliance.', challenges: ['Drug Discovery', 'Clinical Trials', 'Regulatory Compliance', 'Supply Chain'], solutions: ['AI Drug Discovery', 'Clinical Data Management', 'Regulatory Information Systems', 'Supply Chain Traceability'], relatedServices: ['Data, Analytics & AI', 'Cloud Services', 'Quality Engineering & Testing', 'Blockchain & Web3'] },
    'logistics-supply-chain': { name: 'Logistics & Supply Chain', icon: Truck, description: 'Smart logistics and supply chain solutions for visibility, efficiency, and resilience.', content: 'We help logistics companies achieve end-to-end supply chain visibility and optimize operations with AI and IoT.', challenges: ['Supply Chain Visibility', 'Last-Mile Delivery', 'Demand Forecasting', 'Sustainability'], solutions: ['Control Tower Platforms', 'Route Optimization', 'Demand Planning AI', 'Carbon Tracking'], relatedServices: ['Data, Analytics & AI', 'IoT & Connected Products', 'Cloud Services', 'Business Process Automation'] },
    'manufacturing': { name: 'Manufacturing', icon: Factory, description: 'Industry 4.0 solutions for smart factories, quality, and supply chain.', content: 'We help manufacturers adopt Industry 4.0 technologies to build smart factories, improve quality, and optimize supply chains.', challenges: ['Smart Factory', 'Quality Control', 'Supply Chain Resilience', 'Workforce'], solutions: ['Industrial IoT', 'Computer Vision QC', 'Digital Twin', 'MES/MOM Systems'], relatedServices: ['IoT & Connected Products', 'Data, Analytics & AI', 'Enterprise Resource Planning', 'Digital Engineering'] },
    'media-entertainment': { name: 'Media & Entertainment', icon: Film, description: 'Content, streaming, and audience engagement solutions for media companies.', content: 'We help media companies deliver compelling content experiences, optimize monetization, and engage audiences at scale.', challenges: ['Content Monetization', 'Audience Engagement', 'Streaming Quality', 'Rights Management'], solutions: ['OTT/Streaming Platforms', 'Content Recommendation AI', 'Ad Tech Solutions', 'DRM Systems'], relatedServices: ['Application Services', 'Cloud Services', 'Data, Analytics & AI', 'Digital Experience & Design'] },
    'mining-metals': { name: 'Mining & Metals', icon: Pickaxe, description: 'Technology solutions for mining operations, safety, and sustainability.', content: 'We help mining companies optimize operations, enhance safety, and meet sustainability goals through digital transformation.', challenges: ['Operational Safety', 'Resource Optimization', 'Environmental Impact', 'Remote Operations'], solutions: ['Autonomous Mining Systems', 'Safety Monitoring IoT', 'Environmental Analytics', 'Remote Operations Center'], relatedServices: ['IoT & Connected Products', 'Data, Analytics & AI', 'Cloud Services', 'Digital Engineering'] },
    'non-profit': { name: 'Non-Profit', icon: Heart, description: 'Technology solutions for NGOs and non-profit organizations.', content: 'We help non-profit organizations maximize impact through technology, improving fundraising, operations, and mission delivery.', challenges: ['Fundraising', 'Donor Management', 'Impact Measurement', 'Digital Outreach'], solutions: ['CRM Solutions', 'Impact Analytics', 'Digital Fundraising', 'Volunteer Management'], relatedServices: ['Application Services', 'Cloud Services', 'Data, Analytics & AI', 'Digital Experience & Design'] },
    'oil-gas': { name: 'Oil & Gas', icon: Flame, description: 'Digital oilfield solutions and operational technology for energy companies.', content: 'We help oil and gas companies optimize upstream and downstream operations with AI, IoT, and advanced analytics.', challenges: ['Asset Integrity', 'Production Optimization', 'Safety & Compliance', 'Energy Transition'], solutions: ['Predictive Maintenance IoT', 'Production Analytics', 'Safety Management Systems', 'Carbon Accounting'], relatedServices: ['IoT & Connected Products', 'Data, Analytics & AI', 'Cloud Services', 'Enterprise Resource Planning'] },
    'pharmaceuticals': { name: 'Pharmaceuticals', icon: Pill, description: 'Technology solutions for pharmaceutical manufacturers and distributors.', content: 'We help pharmaceutical companies accelerate research, ensure compliance, and optimize manufacturing and distribution.', challenges: ['R&D Acceleration', 'Regulatory Compliance', 'Manufacturing Quality', 'Supply Chain Integrity'], solutions: ['AI-powered R&D', 'Quality Management Systems', 'Supply Chain Track & Trace', 'Commercial Analytics'], relatedServices: ['Data, Analytics & AI', 'Quality Engineering & Testing', 'Cloud Services', 'Blockchain & Web3'] },
    'professional-services': { name: 'Professional Services', icon: Briefcase, description: 'Technology solutions for consulting firms and professional service providers.', content: 'We help professional services firms improve client delivery, optimize resource utilization, and drive digital innovation.', challenges: ['Resource Management', 'Client Experience', 'Knowledge Management', 'Digital Delivery'], solutions: ['PSA Platforms', 'Client Portals', 'Knowledge Graphs', 'Collaboration Tools'], relatedServices: ['Application Services', 'Cloud Services', 'Data, Analytics & AI', 'Business Process Automation'] },
    'real-estate': { name: 'Real Estate', icon: Building, description: 'PropTech solutions for developers, managers, and real estate investors.', content: 'We help real estate companies leverage technology for property management, tenant experience, and investment analytics.', challenges: ['Property Management', 'Tenant Experience', 'Investment Analytics', 'Smart Buildings'], solutions: ['Property Management Platforms', 'Smart Building IoT', 'Investment Analytics', 'Virtual Tours'], relatedServices: ['Application Services', 'IoT & Connected Products', 'Data, Analytics & AI', 'Digital Experience & Design'] },
    'renewable-energy': { name: 'Renewable Energy', icon: Sun, description: 'Technology solutions for solar, wind, and clean energy companies.', content: 'We help renewable energy companies optimize generation, manage assets, and integrate with grid infrastructure.', challenges: ['Generation Optimization', 'Grid Integration', 'Asset Management', 'Forecasting'], solutions: ['AI Generation Forecasting', 'Asset Performance Management', 'Grid Integration Platforms', 'Energy Storage Management'], relatedServices: ['IoT & Connected Products', 'Data, Analytics & AI', 'Cloud Services', 'Digital Engineering'] },
    'retail-ecommerce': { name: 'Retail & Ecommerce', icon: ShoppingCart, description: 'Omnichannel commerce and customer experience solutions for retailers.', content: 'We help retailers deliver seamless omnichannel experiences, optimize supply chains, and leverage data for personalization.', challenges: ['Omnichannel Experience', 'Personalization', 'Supply Chain', 'Customer Loyalty'], solutions: ['Commerce Platforms', 'AI Personalization', 'Inventory Optimization', 'Loyalty Programs'], relatedServices: ['Digital Experience & Design', 'Data, Analytics & AI', 'Cloud Services', 'Application Services'] },
    'semiconductors': { name: 'Semiconductors', icon: Microchip, description: 'Technology solutions for semiconductor design and manufacturing companies.', content: 'We help semiconductor companies optimize design processes, improve manufacturing yields, and manage complex supply chains.', challenges: ['Design Complexity', 'Manufacturing Yield', 'Supply Chain', 'IP Protection'], solutions: ['EDA Tool Integration', 'Yield Analytics', 'Supply Chain Planning', 'IP Management'], relatedServices: ['Data, Analytics & AI', 'Digital Engineering', 'Cloud Services', 'Cybersecurity'] },
    'sports-fitness': { name: 'Sports & Fitness', icon: Trophy, description: 'Technology solutions for sports organizations and fitness companies.', content: 'We help sports and fitness companies engage fans, optimize performance, and build digital experiences.', challenges: ['Fan Engagement', 'Performance Analytics', 'Revenue Diversification', 'Digital Fitness'], solutions: ['Fan Experience Apps', 'Performance Analytics', 'Streaming Platforms', 'Wearable Integration'], relatedServices: ['Application Services', 'Data, Analytics & AI', 'Digital Experience & Design', 'IoT & Connected Products'] },
    'telecommunications': { name: 'Telecommunications', icon: Radio, description: 'Network and digital service solutions for telecom providers.', content: 'We help telecom providers modernize networks, launch innovative services, and improve customer satisfaction.', challenges: ['Network Modernization', 'Service Innovation', 'Customer Satisfaction', 'Operational Efficiency'], solutions: ['5G Solutions', 'Service Orchestration', 'Customer Experience AI', 'Network Analytics'], relatedServices: ['Cloud Services', 'Data, Analytics & AI', 'Digital Engineering', 'Infrastructure Modernization'] },
    'transportation': { name: 'Transportation', icon: Train, description: 'Smart transportation and mobility solutions for transit and logistics.', content: 'We help transportation companies optimize operations, improve safety, and enhance passenger experience.', challenges: ['Operational Efficiency', 'Safety', 'Passenger Experience', 'Sustainability'], solutions: ['Fleet Management AI', 'Passenger Information Systems', 'Predictive Maintenance', 'Electric Vehicle Management'], relatedServices: ['IoT & Connected Products', 'Data, Analytics & AI', 'Application Services', 'Cloud Services'] },
    'travel-leisure': { name: 'Travel & Leisure', icon: Globe, description: 'Technology solutions for travel agencies, tour operators, and leisure companies.', content: 'We help travel companies deliver personalized experiences, optimize pricing, and build digital platforms.', challenges: ['Personalization', 'Dynamic Pricing', 'Booking Experience', 'Partner Integration'], solutions: ['Travel Booking Platforms', 'Revenue Management AI', 'Personalization Engines', 'GDS Integration'], relatedServices: ['Application Services', 'Data, Analytics & AI', 'Digital Experience & Design', 'Cloud Services'] },
    'veterinary': { name: 'Veterinary', icon: PawPrint, description: 'Technology solutions for veterinary practices and animal health companies.', content: 'We help veterinary organizations improve practice management, clinical care, and pet owner engagement.', challenges: ['Practice Management', 'Clinical Records', 'Client Communication', 'Telemedicine'], solutions: ['Veterinary EHR', 'Telehealth Platforms', 'Client Engagement Apps', 'Inventory Management'], relatedServices: ['Application Services', 'Cloud Services', 'Data, Analytics & AI', 'Digital Experience & Design'] },
    'warehousing': { name: 'Warehousing', icon: Package, description: 'Smart warehouse and fulfillment solutions for distribution companies.', content: 'We help warehousing companies optimize operations with automation, robotics, and intelligent management systems.', challenges: ['Order Fulfillment', 'Inventory Accuracy', 'Labor Optimization', 'Space Utilization'], solutions: ['Warehouse Management Systems', 'Robotics Integration', 'Pick Path Optimization', 'Inventory Analytics'], relatedServices: ['IoT & Connected Products', 'Application Services', 'Data, Analytics & AI', 'Business Process Automation'] },
    'waste-management': { name: 'Waste Management', icon: Recycle, description: 'Smart waste and recycling solutions for environmental sustainability.', content: 'We help waste management companies optimize collection, sorting, and recycling through IoT and data analytics.', challenges: ['Collection Efficiency', 'Sorting Accuracy', 'Recycling Rates', 'Compliance'], solutions: ['Smart Bin IoT', 'AI-powered Sorting', 'Route Optimization', 'Compliance Tracking'], relatedServices: ['IoT & Connected Products', 'Data, Analytics & AI', 'Cloud Services', 'Application Services'] },
    'water-sanitation': { name: 'Water & Sanitation', icon: Droplets, description: 'Smart water management and treatment solutions for utilities.', content: 'We help water utilities optimize treatment, distribution, and conservation through IoT and advanced analytics.', challenges: ['Leak Detection', 'Water Quality', 'Distribution Efficiency', 'Conservation'], solutions: ['Smart Metering IoT', 'Water Quality Monitoring', 'Distribution Analytics', 'Conservation Programs'], relatedServices: ['IoT & Connected Products', 'Data, Analytics & AI', 'Cloud Services', 'Digital Engineering'] },
};

type Props = {
    params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const resolvedParams = await params;
    const industry = industryData[resolvedParams.slug];
    return {
        title: industry ? `${industry.name} | Giakaa Industries` : 'Industry | Giakaa',
        description: industry?.description || 'Giakaa industry solutions',
    };
}

export async function generateStaticParams() {
    return Object.keys(industryData).map((slug) => ({ slug }));
}

export default async function IndustryDetailPage({ params }: Props) {
    const resolvedParams = await params;
    const industry = industryData[resolvedParams.slug];

    if (!industry) {
        return (
            <div className="min-h-screen bg-slate-900 flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-white mb-4">Industry Not Found</h1>
                    <Link href="/industries" className="text-purple-400 hover:text-purple-300">← Back to Industries</Link>
                </div>
            </div>
        );
    }

    return (
        <DetailPageWrapper>
            <div className="min-h-screen bg-slate-900">
                {/* Hero */}
                <section className="relative pt-32 pb-20 overflow-hidden">
                    <div className="absolute inset-0">
                        <div className="absolute top-0 left-1/3 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[120px]" />
                    </div>
                    <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <nav className="flex mb-8">
                            <ol className="flex items-center space-x-2 text-sm text-gray-400">
                                <li><Link href="/" className="hover:text-purple-400 transition-colors">Home</Link></li>
                                <li><span className="mx-2">/</span></li>
                                <li><Link href="/industries" className="hover:text-purple-400 transition-colors">Industries</Link></li>
                                <li><span className="mx-2">/</span></li>
                                <li className="text-purple-400">{industry.name}</li>
                            </ol>
                        </nav>
                        <div className="flex items-start gap-6">
                            <div className="p-4 bg-white/5 rounded-2xl border border-white/10 text-purple-400">
                                <industry.icon className="w-16 h-16" strokeWidth={1.5} />
                            </div>
                            <div>
                                <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">{industry.name}</h1>
                                <p className="text-xl text-gray-400 max-w-3xl leading-relaxed">{industry.description}</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Content */}
                <section className="relative pb-16 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-7xl mx-auto">
                        <div className="grid lg:grid-cols-3 gap-12">
                            <div className="lg:col-span-2 space-y-12">
                                <div>
                                    <h2 className="text-2xl font-bold text-white mb-4">Overview</h2>
                                    <p className="text-gray-300 leading-relaxed text-lg">{industry.content}</p>
                                </div>

                                {/* Challenges & Solutions */}
                                <div className="grid md:grid-cols-2 gap-8">
                                    <div>
                                        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                                            <span className="w-8 h-8 bg-red-500/10 rounded-lg flex items-center justify-center text-red-400 text-sm">
                                                <AlertCircle className="w-5 h-5" />
                                            </span>
                                            Key Challenges
                                        </h3>
                                        <div className="space-y-3">
                                            {industry.challenges.map((c, i) => (
                                                <div key={i} className="flex items-center gap-3 p-3 bg-slate-800/50 rounded-lg border border-slate-700/50">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-red-400" />
                                                    <span className="text-gray-300">{c}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                                            <span className="w-8 h-8 bg-emerald-500/10 rounded-lg flex items-center justify-center text-emerald-400 text-sm">
                                                <CheckCircle className="w-5 h-5" />
                                            </span>
                                            Our Solutions
                                        </h3>
                                        <div className="space-y-3">
                                            {industry.solutions.map((s, i) => (
                                                <div key={i} className="flex items-center gap-3 p-3 bg-slate-800/50 rounded-lg border border-slate-700/50">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                                                    <span className="text-gray-300">{s}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* CTA */}
                                <div className="p-8 bg-gradient-to-r from-slate-800 to-slate-800/50 rounded-2xl border border-slate-700/50">
                                    <h3 className="text-2xl font-bold text-white mb-3">Transform Your {industry.name} Business</h3>
                                    <p className="text-gray-400 mb-6">Let&apos;s discuss how we can help you overcome industry challenges and drive innovation.</p>
                                    <Link href="/contact" className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-600 text-white font-semibold rounded-full hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 hover:-translate-y-0.5">
                                        Get Started
                                        <ArrowRight className="w-4 h-4 ml-2" />
                                    </Link>
                                </div>
                            </div>

                            {/* Sidebar */}
                            <div className="space-y-8">
                                <div className="p-6 bg-slate-800/50 rounded-2xl border border-slate-700/50">
                                    <h3 className="text-lg font-bold text-white mb-4">Related Services</h3>
                                    <div className="space-y-2">
                                        {industry.relatedServices.map((svc, i) => (
                                            <Link key={i} href={`/services/${svc.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`} className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-700/50 transition-colors text-gray-300 hover:text-purple-400">
                                                {svc}
                                                <ChevronRight className="w-4 h-4" />
                                            </Link>
                                        ))}
                                    </div>
                                </div>

                                <div className="p-6 bg-slate-800/50 rounded-2xl border border-slate-700/50">
                                    <h3 className="text-lg font-bold text-white mb-4">Explore More Industries</h3>
                                    <div className="space-y-2">
                                        {Object.entries(industryData)
                                            .filter(([slug]) => slug !== resolvedParams.slug)
                                            .slice(0, 6)
                                            .map(([slug, ind]) => (
                                                <Link key={slug} href={`/industries/${slug}`} className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-700/50 transition-colors text-gray-300 hover:text-purple-400">
                                                    <ind.icon className="w-5 h-5" />
                                                    <span className="text-sm">{ind.name}</span>
                                                </Link>
                                            ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </DetailPageWrapper>
    );
}
