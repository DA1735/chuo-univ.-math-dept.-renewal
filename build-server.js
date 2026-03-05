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
    external: ['mysql2'], // ネイティブ依存を含む可能性のあるモジュールはバンドルから除外し、環境側（PleskのNPMインストール）で解決させます
    format: 'esm',
}).then(() => {
    fs.copyFileSync('package.json', 'build/package.json');
    if (fs.existsSync('package-lock.json')) {
        fs.copyFileSync('package-lock.json', 'build/package-lock.json');
    }
    console.log('✅ バックエンドのビルドとパッケージのコピーが完了しました。出力先: build/');
}).catch(() => process.exit(1))
