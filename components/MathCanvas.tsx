import React, { useState, useEffect } from 'react';
import MathCanvasV8 from './math-canvas/MathCanvasV8';
import MathCanvasV9 from './math-canvas/MathCanvasV9';
import MathCanvasV35 from './math-canvas/MathCanvasV35';

/**
 * 複数の数理バリエーションの中から、マウント時にランダムに1つ選んで表示する
 * マネージャーコンポーネント
 */
const MathCanvas: React.FC = () => {
  const [SelectedCanvas, setSelectedCanvas] = useState<React.FC | null>(null);

  useEffect(() => {
    // 利用可能なキャンバスの配列
    const canvases = [MathCanvasV8, MathCanvasV9, MathCanvasV35];
    // マウント時にランダムに1つ選択
    const randomIndex = Math.floor(Math.random() * canvases.length);
    setSelectedCanvas(() => canvases[randomIndex]);
  }, []);

  // SSRや初期レンダリング時など、まだ選ばれていない場合は何も表示しない
  if (!SelectedCanvas) {
    return null;
  }

  return <SelectedCanvas />;
};

export default MathCanvas;