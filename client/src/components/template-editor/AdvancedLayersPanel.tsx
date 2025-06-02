import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Eye, EyeOff, Lock, Unlock, ChevronUp, ChevronDown, Type, Image as ImageIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface CanvasElementBase {
  id: number;
  type: 'text' | 'image' | 'template' | 'logo' | 'signature';
  name: string;
  label?: string;
  zIndex: number;
  visible: boolean;
  locked?: boolean;
  position: { x: number; y: number; snapToGrid?: boolean };
}

export interface TextElement extends CanvasElementBase {
  type: 'text';
  content?: string;
  style?: {
    fontSize?: number;
    fontFamily?: string;
    fontWeight?: string;
    color?: string;
    [key: string]: any;
  };
}

export interface ImageElement extends CanvasElementBase {
  type: 'image' | 'template' | 'logo' | 'signature';
  src?: string;
  dimensions?: { width: number; height: number };
}

export type CanvasElement = TextElement | ImageElement;

interface AdvancedLayersPanelProps {
  elements: CanvasElement[];
  selectedElementId: number | null;
  onElementSelect: (id: number) => void;
  onElementUpdate: (updated: CanvasElement[]) => void;
  onMoveLayerUp: (id: number) => void;
  onMoveLayerDown: (id: number) => void;
  onVisibilityToggle: (id: number) => void;
  onLockToggle: (id: number) => void;
  onAddElement: (type: CanvasElement['type']) => void;
}

export const AdvancedLayersPanel: React.FC<AdvancedLayersPanelProps> = ({
  elements,
  selectedElementId,
  onElementSelect,
  onElementUpdate,
  onMoveLayerUp,
  onMoveLayerDown,
  onVisibilityToggle,
  onLockToggle,
  onAddElement,
}) => {
  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <CardTitle>الطبقات</CardTitle>
          <div className="flex gap-2">
            {['text', 'image'].map(type => (
              <Button
                key={type}
                onClick={() => onAddElement(type as CanvasElement['type'])}
                title={`إضافة ${type === 'text' ? 'نص' : 'صورة'}`}
                size="icon"
                variant="outline"
              >
                {type === 'text' ? <Type /> : <ImageIcon />}
              </Button>
            ))}
          </div>
        </div>
      </CardHeader>

      <CardContent className="overflow-auto">
        {elements
          .sort((a, b) => (b.zIndex ?? 0) - (a.zIndex ?? 0))
          .map((el, index) => (
            <div
              key={el.id}
              className={cn(
                'flex items-center justify-between p-2 rounded hover:bg-muted',
                selectedElementId === el.id && 'bg-primary/10 border-r-2 border-primary'
              )}
              onClick={() => onElementSelect(el.id)}
            >
              <div className="flex items-center gap-2">
                {el.type === 'text' ? <Type /> : <ImageIcon />}
                <div className="flex flex-col">
                  <span className="font-medium text-sm">{el.label || el.name}</span>
                  <span className="text-xs text-muted-foreground">zIndex: {el.zIndex}</span>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <Button size="icon" variant="ghost" onClick={() => onVisibilityToggle(el.id)}>
                  {el.visible ? <Eye /> : <EyeOff />}
                </Button>
                <Button size="icon" variant="ghost" onClick={() => onLockToggle(el.id)}>
                  {el.locked ? <Lock /> : <Unlock />}
                </Button>
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => onMoveLayerUp(el.id)}
                  disabled={index === 0}
                >
                  <ChevronUp />
                </Button>
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => onMoveLayerDown(el.id)}
                  disabled={index === elements.length - 1}
                >
                  <ChevronDown />
                </Button>
              </div>
            </div>
          ))}
      </CardContent>
    </Card>
  );
};
