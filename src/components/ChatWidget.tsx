
"use client";

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, User, Bot, Loader2, Minimize2, Maximize2, History } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

interface Message {
    role: 'user' | 'assistant';
    content: string;
}

export default function ChatWidget() {
    const [isOpen, setIsOpen] = useState(false);
    const [isMinimized, setIsMinimized] = useState(false);
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState<Message[]>([
        { role: 'assistant', content: 'नमस्कार! मैं जार्विस हूँ, आपका लुहाच वंश एआई सहायक। मैं यहाँ आपके वंश के इतिहास, प्रवास और वंशावली के बारे में सहायता के लिए हूँ। आप क्या जानना चाहेंगे?' }
    ]);
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isLoading]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;

        const userMessage = input.trim();
        setInput('');
        setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
        setIsLoading(true);

        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    messages: [...messages, { role: 'user', content: userMessage }],
                    // In the future, we can pass selectedPersonIds from the page state here
                }),
            });

            const data = await response.json();
            if (data.text) {
                setMessages(prev => [...prev, { role: 'assistant', content: data.text }]);
            } else {
                setMessages(prev => [...prev, { role: 'assistant', content: 'क्षमा करें, मैं अभी जवाब नहीं दे पा रहा हूँ। कृपया बाद में प्रयास करें।' }]);
            }
        } catch (error) {
            console.error('Chat Error:', error);
            setMessages(prev => [...prev, { role: 'assistant', content: 'Connection Error. Please check your internet.' }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <div className="fixed bottom-6 right-6 z-[999]">
                <AnimatePresence>
                    {!isOpen && (
                        <motion.button
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0, opacity: 0 }}
                            onClick={() => setIsOpen(true)}
                            className="bg-orange-600 hover:bg-orange-700 text-white p-4 rounded-full shadow-2xl flex items-center gap-2 group transition-all"
                        >
                            <MessageCircle className="w-6 h-6" />
                            <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 font-medium">Ask Jarvis</span>
                        </motion.button>
                    )}
                </AnimatePresence>

                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: 50, scale: 0.95 }}
                            animate={{
                                opacity: 1,
                                y: 0,
                                scale: 1,
                                height: isMinimized ? '64px' : '600px',
                                width: isMinimized ? '300px' : '400px'
                            }}
                            exit={{ opacity: 0, y: 50, scale: 0.95 }}
                            className="bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden"
                        >
                            {/* Header */}
                            <div className="bg-gradient-to-r from-orange-600 to-orange-500 p-4 flex items-center justify-between text-white shrink-0">
                                <div className="flex items-center gap-3">
                                    <div className="bg-white/20 p-2 rounded-lg backdrop-blur-sm">
                                        <Bot className="w-5 h-5 text-white" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-sm tracking-wide">JARVIS AI</h3>
                                        <p className="text-[10px] text-orange-100 opacity-80 uppercase leading-none">Luhach Dynasty Assistant</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-1">
                                    <button onClick={() => setIsMinimized(!isMinimized)} className="p-1.5 hover:bg-white/20 rounded-lg transition-colors">
                                        {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
                                    </button>
                                    <button onClick={() => setIsOpen(false)} className="p-1.5 hover:bg-white/20 rounded-lg transition-colors">
                                        <X className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>

                            {!isMinimized && (
                                <>
                                    {/* Messages */}
                                    <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/50">
                                        {messages.map((m, i) => (
                                            <div key={i} className={cn("flex w-full", m.role === 'user' ? "justify-end" : "justify-start")}>
                                                <div className={cn(
                                                    "max-w-[85%] rounded-2xl p-3 text-sm shadow-sm",
                                                    m.role === 'user'
                                                        ? "bg-orange-600 text-white rounded-tr-none"
                                                        : "bg-white text-gray-800 border border-gray-200 rounded-tl-none"
                                                )}>
                                                    <div className="whitespace-pre-wrap leading-relaxed">{m.content}</div>
                                                </div>
                                            </div>
                                        ))}
                                        {isLoading && (
                                            <div className="flex justify-start">
                                                <div className="bg-white border border-gray-200 rounded-2xl rounded-tl-none p-3 shadow-sm">
                                                    <Loader2 className="w-4 h-4 animate-spin text-orange-500" />
                                                </div>
                                            </div>
                                        )}
                                        <div ref={messagesEndRef} />
                                    </div>

                                    {/* Input */}
                                    <form onSubmit={handleSubmit} className="p-4 bg-white border-t border-gray-100 flex gap-2">
                                        <input
                                            type="text"
                                            value={input}
                                            onChange={(e) => setInput(e.target.value)}
                                            placeholder="Ask about history, migration or a person..."
                                            className="flex-1 bg-gray-100 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all font-medium"
                                        />
                                        <button
                                            type="submit"
                                            disabled={!input.trim() || isLoading}
                                            className="bg-orange-600 hover:bg-orange-700 disabled:bg-gray-300 text-white p-2 rounded-xl transition-colors shrink-0"
                                        >
                                            <Send className="w-5 h-5" />
                                        </button>
                                    </form>
                                </>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </>
    );
}
