import React from "react";
import NeuralBackground from "@/components/ui/flow-field-background";
import { ArrowRight, Sparkles } from "lucide-react";

export default function NeuralHeroDemo() {
    return (
        // Container must have a defined height, or use h-screen
        <div className="relative w-full h-screen">
            <NeuralBackground
                color="#818cf8" // Indigo-400
                scale={1}
                trailOpacity={0.1} // Lower = longer trails
                speed={0.8}
            />
        </div>
    );
}
