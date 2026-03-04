import React, { ErrorInfo, ReactNode } from "react";
import { AlertTriangle, RotateCcw, Home } from "lucide-react";

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

// ErrorBoundary using class component (required by React).
// Type casts are used to work around TS class property resolution
// issues caused by the project's tsconfig (useDefineForClassFields).
class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    (this as any).state = {
      hasError: false,
      error: null,
    };
  }

  public static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    const currentState = (this as any).state as ErrorBoundaryState;
    const currentProps = (this as any).props as ErrorBoundaryProps;

    if (currentState.hasError) {
      return (
        <div className="min-h-screen bg-[#FAFBFC] flex items-center justify-center p-6 font-sans">
          <div className="max-w-md w-full bg-white p-8 rounded-sm shadow-xl border-t-4 border-chuo-red text-center">
            <div className="w-16 h-16 bg-red-50 text-chuo-red rounded-full flex items-center justify-center mx-auto mb-6">
              <AlertTriangle size={32} />
            </div>

            <h1 className="text-2xl font-bold text-gray-800 mb-2">
              予期せぬエラーが発生しました
            </h1>
            <p className="text-sm text-gray-500 mb-8 leading-relaxed">
              申し訳ありません。システム内で計算不能な例外が発生しました。<br />
              しばらく時間をおいてから、再度お試しください。
            </p>

            <div className="flex flex-col gap-3">
              <button
                onClick={() => window.location.reload()}
                className="flex items-center justify-center gap-2 w-full py-3 bg-chuo-blue text-white font-bold rounded hover:bg-[#002550] transition-colors"
              >
                <RotateCcw size={16} />
                ページを再読み込み
              </button>

              <button
                onClick={() => window.location.href = '/'}
                className="flex items-center justify-center gap-2 w-full py-3 border border-gray-200 text-gray-600 font-bold rounded hover:bg-gray-50 transition-colors"
              >
                <Home size={16} />
                トップページへ戻る
              </button>
            </div>

            {currentState.error && (
              <details className="mt-8 text-left">
                <summary className="text-xs text-gray-400 cursor-pointer hover:text-gray-600 mb-2">
                  エラー詳細（開発者用）
                </summary>
                <pre className="bg-gray-50 p-4 rounded text-[10px] text-red-500 overflow-auto max-h-32 font-mono">
                  {currentState.error.toString()}
                </pre>
              </details>
            )}
          </div>
        </div>
      );
    }

    return currentProps.children;
  }
}

export default ErrorBoundary;
