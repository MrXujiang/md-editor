import React, { useState, useEffect } from 'react';
import { Editor } from '@bytemd/react';
import gfm from '@bytemd/plugin-gfm';
import highlight from '@bytemd/plugin-highlight';
import math from '@bytemd/plugin-math';
import breaks from '@bytemd/plugin-breaks';
import frontmatter from '@bytemd/plugin-frontmatter';
import mermaid from '@bytemd/plugin-mermaid';
import zhHans from 'bytemd/locales/zh_Hans.json';
import 'github-markdown-css';
import 'highlight.js/styles/vs.css';

// 导入所需的样式
import 'bytemd/dist/index.css';

import { Toolbar } from '../Toolbar';
import { DocumentsList } from '../DocumentsList';
import { Notification } from '../Notification';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import styles from './index.less';

// 添加图片处理函数
const convertImageToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
};

// 配置 ByteMD 插件
const plugins = [
    gfm({
        // 配置 GFM 插件选项
        breaks: true, // 支持软换行
        bulletListMarker: '-', // 无序列表标记
        emoji: true, // 支持 emoji
        tasklist: true, // 支持任务列表
        strikethrough: true, // 支持删除线
        list: true
    }),
    highlight({
        // 配置代码高亮
        theme: 'github' // 或其他主题
    }),
    math(),
    breaks(),
    frontmatter(),
    mermaid()
];

// 编辑器配置
const editorConfig = {
    mode: 'split', // 分屏模式
    placeholder: '开始编写你的 Markdown 文档...',
    uploadImages: async (files: File[]) => {
        // 这里可以实现图片上传功能
        return files.map(file => ({
            url: URL.createObjectURL(file),
            alt: file.name,
            title: file.name
        }));
    }
};

export const EditorContainer: React.FC = () => {
    const [documents, setDocuments] = useLocalStorage<Document[]>('edumd-documents', []);
    const [currentDoc, setCurrentDoc] = useState<Document | null>(null);
    const [notification, setNotification] = useState<{message: string; type: 'success' | 'error'} | null>(null);

    useEffect(() => {
        const lastDocId = localStorage.getItem('lastDocId');
        if (lastDocId) {
            const doc = documents.find(d => d.id === lastDocId);
            if (doc) setCurrentDoc(doc);
        }
    }, [documents]);

    const createNewDoc = () => {
        const newDoc: Document = {
            id: `doc_${Date.now()}`,
            title: '未命名文档',
            content: getDefaultContent(),
            created: Date.now(),
            updated: Date.now()
        };

        setDocuments([newDoc, ...documents]);
        setCurrentDoc(newDoc);
        showNotification('新文档已创建', 'success');
    };

    const getDefaultContent = () => {
        return `# 未命名文档

## 使用指南

这是一个支持完整 Markdown 语法的编辑器，你可以：

- 创建标题、段落和列表
- 插入代码块和数学公式
- 添加表格和图片
- 使用任务列表
  - [x] 已完成的任务
  - [ ] 待完成的任务

### 示例列表

1. 有序列表项 1
2. 有序列表项 2
   - 无序子列表项
   - 另一个子列表项
3. 有序列表项 3

### 代码示例

\`\`\`javascript
function hello() {
  console.log('Hello, Markdown!');
}
\`\`\`

### 表格示例

| 功能 | 支持情况 |
|------|----------|
| 标题 | ✅ |
| 列表 | ✅ |
| 代码块 | ✅ |
| 数学公式 | ✅ |

`;
    };

    const saveDoc = () => {
        if (!currentDoc) return;

        const updatedDoc = {
            ...currentDoc,
            updated: Date.now()
        };

        setDocuments(documents.map(doc =>
            doc.id === currentDoc.id ? updatedDoc : doc
        ));
        setCurrentDoc(updatedDoc);
        localStorage.setItem('lastDocId', updatedDoc.id);
        showNotification('文档已保存', 'success');
    };

    const deleteDoc = (docId: string) => {
        if (!window.confirm('确定要删除这个文档吗？')) return;

        setDocuments(documents.filter(doc => doc.id !== docId));
        if (currentDoc?.id === docId) {
            setCurrentDoc(null);
        }
        showNotification('文档已删除', 'success');
    };

    const handleDocChange = (content: string) => {
        console.log(content);
        if (!currentDoc) return;

        const title = extractTitle(content) || '未命名文档';

        setCurrentDoc({
            ...currentDoc,
            title,
            content,
            updated: Date.now()
        });

        // 自动保存
        const updatedDocs = documents.map(doc =>
            doc.id === currentDoc.id ? { ...doc, title, content, updated: Date.now() } : doc
        );
        localStorage.setItem('lastDocId', currentDoc.id);
        setDocuments(updatedDocs);
    };

    const extractTitle = (content: string): string => {
        // 从内容中提取第一个标题作为文档标题
        const match = content.match(/^#\s+(.+)$/m);
        return match ? match[1].trim() : '';
    };

    const showNotification = (message: string, type: 'success' | 'error') => {
        setNotification({ message, type });
        setTimeout(() => setNotification(null), 3000);
    };

    return (
        <div className={styles.container}>
            <Toolbar
                onNew={createNewDoc}
                onSave={saveDoc}
                disabled={!currentDoc}
            />

            <div className={styles.content}>
                <DocumentsList
                    documents={documents}
                    currentDoc={currentDoc}
                    onSelect={setCurrentDoc}
                    onDelete={deleteDoc}
                />

                <div className={styles.editor}>
                    {currentDoc ? (
                        <Editor
                            value={currentDoc.content}
                            plugins={plugins}
                            locale={zhHans}
                            onChange={handleDocChange}
                            {...editorConfig}
                        />
                    ) : (
                        <div className={styles.placeholder}>
                            <p>选择一个文档或创建新文档开始编辑</p>
                            <button onClick={createNewDoc}>创建新文档</button>
                        </div>
                    )}
                </div>
            </div>

            {notification && (
                <Notification
                    message={notification.message}
                    type={notification.type}
                />
            )}
        </div>
    );
};