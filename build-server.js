import * as esbuild from 'esbuild'
import * as fs from 'fs'

if (!fs.existsSync('build')) {
    fs.mkdirSync('build');
}

esbuild.build({
    entryPoints: ['server/index.tsx'],
    bundle: true,
    outfile: 'build/server.js',
    platform: 'node',
    target: 'node18',
    format: 'esm',
    // 全ての依存をバンドルに含める（Pleskで npm install 不要にするため）
}).then(() => {
    console.log('✅ バックエンドのビルドが完了しました。出力先: build/server.js');
}).catch(() => process.exit(1))
