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
    format: 'cjs',
    // 全ての依存をバンドルに含める（Pleskで npm install 不要にするため）
}).then(() => {
    // Pleskは npm start でアプリを起動するため、最小限の package.json を生成
    const prodPackageJson = {
        name: "chuo-math-server",
        private: true,
        scripts: {
            start: "node server.js"
        }
    };
    fs.writeFileSync('build/package.json', JSON.stringify(prodPackageJson, null, 2));
    console.log('✅ バックエンドのビルドが完了しました。出力先: build/');
}).catch(() => process.exit(1))
