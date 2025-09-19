import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import type { McrCommand, Image } from '@shared/schema';

const keyboardLayout = [
  ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace'],
  ['Tab', 'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '[', ']', '\\'],
  ['CapsLock', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ';', "'", 'Enter'],
  ['Shift', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', ',', '.', '/', 'Shift'],
  ['Ctrl', 'Meta', 'Alt', 'Space', 'Alt', 'Meta', 'ContextMenu', 'Ctrl'],
];

const specialKeys: { [key: string]: string } = {
  'Backspace': 'w-20',
  'Tab': 'w-16',
  'CapsLock': 'w-20',
  'Enter': 'w-24',
  'Shift': 'w-28',
  'Ctrl': 'w-14',
  'Meta': 'w-14',
  'Alt': 'w-14',
  'Space': 'w-64',
  'ContextMenu': 'w-14',
};

export default function KeyboardEditor({ onExcludedKeysChange, associatedImage, onAddCommand }: { onExcludedKeysChange: (keys: string[]) => void; associatedImage?: Image | null; onAddCommand: (command: McrCommand) => void }) {
  const [excludedKeys, setExcludedKeys] = useState<string[]>([]);

  const handleToggleExcludeKey = (key: string) => {
    setExcludedKeys(prev => {
      const newExcludedKeys = prev.includes(key) ? prev.filter(k => k !== key) : [...prev, key];
      onExcludedKeysChange(newExcludedKeys);
      return newExcludedKeys;
    });
  };

  const handleImageClick = (event: React.MouseEvent<HTMLImageElement>) => {
    if (!associatedImage) return;

    const img = event.currentTarget;
    const rect = img.getBoundingClientRect();
    const x = Math.round(event.clientX - rect.left);
    const y = Math.round(event.clientY - rect.top);

    const mouseCommand: McrCommand = {
      type: 'mouse',
      action: 'click', // Assuming a simple click for now
      x,
      y,
    };
    onAddCommand(mouseCommand);
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <CardTitle>Visual Keyboard Editor</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row items-start space-y-4 md:space-y-0 md:space-x-4"> {/* Added flex-row and space-x */}
          <div className="flex flex-col items-center space-y-1 p-4 bg-gray-100 rounded-lg shadow-inner">
            {keyboardLayout.map((row, rowIndex) => (
              <div key={rowIndex} className="flex space-x-1">
                {row.map((key, keyIndex) => (
                  <Button
                    key={keyIndex}
                    variant={excludedKeys.includes(key) ? "destructive" : "outline"}
                    className={`h-10 flex items-center justify-center text-sm font-mono ${specialKeys[key] || 'w-10'}`}
                    onClick={() => handleToggleExcludeKey(key)}
                  >
                    {key}
                  </Button>
                ))}
              </div>
            ))}
          </div>
          {associatedImage && (
            <div className="flex-1 p-4 border rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold mb-2">Associated Image (Click to add Mouse Command)</h3>
              <img 
                src={`/images/${associatedImage.filename}`} 
                alt={associatedImage.originalName} 
                className="w-full h-auto rounded-md cursor-pointer" 
                onClick={handleImageClick} 
              />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
