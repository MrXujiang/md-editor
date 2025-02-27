import React from 'react';
import classNames from 'classnames';
import styles from './documentList.less';

export function formatDate(timestamp: number): string {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now.getTime() - date.getTime();

    // 小于1分钟
    if (diff < 60000) {
        return '刚刚';
    }

    // 小于1小时
    if (diff < 3600000) {
        const minutes = Math.floor(diff / 60000);
        return `${minutes}分钟前`;
    }

    // 小于24小时
    if (diff < 86400000) {
        const hours = Math.floor(diff / 3600000);
        return `${hours}小时前`;
    }

    // 小于7天
    if (diff < 604800000) {
        const days = Math.floor(diff / 86400000);
        return `${days}天前`;
    }

    // 其他情况显示完整日期
    return date.toLocaleDateString('zh-CN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

interface DocumentsListProps {
    documents: Document[];
    currentDoc: Document | null;
    onSelect: (doc: Document) => void;
    onDelete: (docId: string) => void;
}

export const DocumentsList: React.FC<DocumentsListProps> = ({
                                                                documents,
                                                                currentDoc,
                                                                onSelect,
                                                                onDelete
                                                            }) => {
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h2 className={styles.title}>我的文档</h2>
                <span className={styles.count}>{documents.length} 个文档</span>
            </div>

            <div className={styles.list}>
                {documents.length === 0 ? (
                    <div className={styles.empty}>
                        <svg className={styles.emptyIcon} viewBox="0 0 24 24" width="48" height="48">
                            <path
                                d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                            />
                            <path d="M13 2v7h7" fill="none" stroke="currentColor" strokeWidth="2"/>
                        </svg>
                        <p>暂无文档</p>
                        <p className={styles.emptyTip}>点击顶部"新建文档"开始编辑</p>
                    </div>
                ) : (
                    documents.map(doc => (
                        <div
                            key={doc.id}
                            className={classNames(styles.item, {
                                [styles.active]: currentDoc?.id === doc.id
                            })}
                            onClick={() => onSelect(doc)}
                        >
                            <div className={styles.itemIcon}>
                                <svg viewBox="0 0 24 24" width="20" height="20">
                                    <path
                                        d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                    />
                                    <path
                                        d="M13 2v7h7"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                    />
                                </svg>
                            </div>

                            <div className={styles.itemContent}>
                                <div className={styles.itemTitle}>{doc.title}</div>
                                <div className={styles.itemMeta}>
                  <span className={styles.itemDate}>
                    {formatDate(doc.updated)}
                  </span>
                                    <span className={styles.itemWords}>
                    {doc.content.length} 字
                  </span>
                                </div>
                            </div>

                            <button
                                className={styles.deleteButton}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onDelete(doc.id);
                                }}
                                title="删除文档"
                            >
                                <svg viewBox="0 0 24 24" width="16" height="16">
                                    <path
                                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        fill="none"
                                    />
                                </svg>
                            </button>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};