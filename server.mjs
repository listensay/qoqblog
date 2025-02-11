import path from "path";
import { fileURLToPath } from "url";
import copyDir from "copy-dir";
import fs from "fs";
import { exec } from "child_process";
import util from "util";
import archiver from "archiver";

// 获取当前文件的路径
const __filename = fileURLToPath(import.meta.url);
// 获取当前文件所在的目录
const __dirname = path.dirname(__filename);

// 定义所有需要用到的路径
const publicPath = path.join(__dirname, "public");
const standalonePath = path.join(__dirname, ".next/standalone/public");
const staticPath = path.join(__dirname, ".next/static");
const standaloneStaticPath = path.join(__dirname, ".next/standalone/.next/static");
const prismaPath = path.join(__dirname, "prisma");
const standalonePrismaPath = path.join(__dirname, ".next/standalone/prisma");

// 拷贝外层 public 文件夹到 standalone 文件夹下
if (fs.existsSync(publicPath)) {
  copyDir.sync(publicPath, standalonePath, { cover: true });
  console.log('Public folder copied successfully');
} else {
  console.log(`Public folder not found at ${publicPath}`);
}

// 拷贝 static 到 standalone/.next 文件夹下
if (fs.existsSync(staticPath)) {
  copyDir.sync(staticPath, standaloneStaticPath, { cover: true });
  console.log('Static folder copied successfully');
} else {
  console.log(`Static folder not found at ${staticPath}`);
}

// 拷贝 prisma 到 standalone/.next 文件夹下
if (fs.existsSync(prismaPath)) {
  copyDir.sync(prismaPath, standalonePrismaPath, { cover: true });
  console.log('Prisma folder copied successfully');
} else {
  console.log(`Prisma folder not found at ${prismaPath}`);
}

// 获取最新的版本号并递增
function getNextVersion(outputDir) {
  // 检查 output 文件夹是否存在
  if (!fs.existsSync(outputDir)) {
    return "v0.0.1"; // 如果不存在，返回初始版本号
  }

  // 获取 output 文件夹中的所有子文件夹
  const versions = fs.readdirSync(outputDir).filter((folder) => {
    return fs.statSync(path.join(outputDir, folder)).isDirectory() && /^v\d+\.\d+\.\d+$/.test(folder);
  });

  if (versions.length === 0) {
    return "v0.0.1"; // 如果没有版本文件夹，返回初始版本号
  }

  // 获取最新版本号
  const latestVersion = versions.sort((a, b) => {
    const aParts = a.slice(1).split(".").map(Number);
    const bParts = b.slice(1).split(".").map(Number);
    for (let i = 0; i < aParts.length; i++) {
      if (aParts[i] !== bParts[i]) {
        return bParts[i] - aParts[i];
      }
    }
    return 0;
  })[0];

  // 递增版本号
  const versionParts = latestVersion.slice(1).split(".").map(Number);
  versionParts[2]++;
  if (versionParts[2] >= 10) {
    versionParts[2] = 0;
    versionParts[1]++;
    if (versionParts[1] >= 10) {
      versionParts[1] = 0;
      versionParts[0]++;
    }
  }

  return `v${versionParts.join(".")}`;
}

// 定义 output 文件夹路径
const outputDir = path.join(__dirname, "output");

// 获取下一个版本号
const nextVersion = getNextVersion(outputDir);

// 定义新版本文件夹路径
const newVersionDir = path.join(outputDir, nextVersion);

// 创建新版本文件夹
fs.mkdirSync(newVersionDir, { recursive: true });

const execPromise = util.promisify(exec);

async function executeCommands() {
  try {
    // 拷贝 standalone 文件夹到新版本文件夹下
    const standaloneSrcPath = path.join(__dirname, ".next/standalone");
    if (fs.existsSync(standaloneSrcPath)) {
      copyDir.sync(standaloneSrcPath, newVersionDir, { cover: true });
      console.log(`Standalone folder has been copied to ${newVersionDir}`);

      // 复制 .env.production 到目标目录的 .env
      const envProductionPath = path.join(__dirname, ".env.production");
      const envTargetPath = path.join(newVersionDir, ".env");

      if (fs.existsSync(envProductionPath)) {
        fs.copyFileSync(envProductionPath, envTargetPath);
        console.log('Environment file copied successfully');

        // 执行 npx prisma generate 命令
        const { stdout, stderr } = await execPromise('npx prisma generate', { 
          cwd: newVersionDir
        });

        if (stderr) {
          console.error(`Command stderr: ${stderr}`);
        }
        console.log(`Command executed successfully: ${stdout}`);

        // 创建 zip 文件
        const zipFilePath = path.join(outputDir, `${nextVersion}.zip`);
        await createZipArchive(newVersionDir, zipFilePath);
        console.log(`Compression completed: ${zipFilePath}`);
      } else {
        console.error(`.env.production file not found at ${envProductionPath}`);
      }
    } else {
      console.error(`Standalone folder not found at ${standaloneSrcPath}`);
    }
  } catch (error) {
    console.error(`Error executing commands: ${error}`);
  }
}

// 添加创建zip文件的函数
function createZipArchive(sourceDir, zipFilePath) {
  return new Promise((resolve, reject) => {
    const output = fs.createWriteStream(zipFilePath);
    const archive = archiver('zip', {
      zlib: { level: 9 } // 设置压缩级别
    });

    output.on('close', () => {
      console.log(`ZIP archive created successfully: ${zipFilePath}`);
      console.log(`Total bytes: ${archive.pointer()}`);
      resolve();
    });

    archive.on('error', (err) => {
      reject(err);
    });

    archive.pipe(output);
    archive.directory(sourceDir, false);
    archive.finalize();
  });
}

executeCommands()