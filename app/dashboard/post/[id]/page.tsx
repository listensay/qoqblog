'use client';

import React, { memo, useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import '@mantine/tiptap/styles.css';
import Highlight from '@tiptap/extension-highlight';
import Underline from '@tiptap/extension-underline';
import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { RichTextEditor } from '@mantine/tiptap';

import { Button, Group, Textarea, TextInput } from '@mantine/core';
import { hasLength, useForm } from '@mantine/form';
import myRequest from '~@/utils/myRequest';
import { fetchGetPost, fetchInsertPost, fetchUpdatePost } from '@/service/posts';
import { notifications } from '@mantine/notifications';

const Page = memo(() => {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);

  const router = useRouter()

  // 使用 useParams 获取动态路由参数
  const params = useParams();
  const id = Number(params.id);

  const editor = useEditor({
    content: '', // 初始内容为空
    extensions: [StarterKit, Underline, Highlight],
    onUpdate: ({ editor }) => {
      setContent(editor.getHTML());
    },
    immediatelyRender: false,
  });

  // 加载文章内容
  useEffect(() => {
    if (id > 0) {
      fetchGetPost(id)
        .then((res) => {
          const { data } = res as any;
          setContent(data.post.content);
          form.setValues({
            title: data.post.title,
            description: data.post.description
          });

          // 手动更新编辑器内容
          if (editor) {
            editor.commands.setContent(data.post.content);
          }
        })
        .catch((error) => {
          console.error('Failed to fetch post:', error);
        });
    }
  }, [id, editor]); // 依赖 editor，确保编辑器实例已初始化

  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      title: '',
      description: '',
    },

    validate: {
      title: hasLength({ min: 3 }, 'Title must be 3 characters long'),
      description: hasLength({ min: 3 }, 'Description must be 3 characters long'),
    },
  });

  const submit = async (values: typeof form.values) => {
    try {
      if(id > 0) {
        await fetchUpdatePost({
          id: id,
          title: values.title,
          description: values.description,
          content: content,
          categoryId: 1,
          cover: ""
        })

        notifications.show({
          title: 'Post updated',
          message: 'Post has been updated successfully',
          color: 'green',
          autoClose: 3000,
        });

        router.push('/dashboard/post')
      } else {
        await fetchInsertPost({
          title: values.title,
          description: values.description,
          content: content,
          categoryId: 1,
          cover: '',
        });

        notifications.show({
          title: 'Post created',
          message: 'Post has been created successfully',
          color: 'green',
          autoClose: 3000,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const generateSummary = () => {
    setLoading(true);

    // content清除HTML标签
    const clearContent = content.replace(/<[^>]+>/g, '');

    try {
      myRequest
        .get('/v1/ai', {
          content: clearContent,
          title: form.values.title,
        })
        .then((res) => {
          const description = JSON.parse(`"${res.data.message}"`);
          form.setValues({
            description,
          });
          setLoading(false);
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <form onSubmit={form.onSubmit((values) => submit(values))}>
        <TextInput
          withAsterisk
          label="标题"
          placeholder="请输入文章标题"
          {...form.getInputProps('title')}
          className="mb-4"
        />

        <RichTextEditor editor={editor} variant="subtle" className="mb-4">
          <RichTextEditor.Toolbar sticky stickyOffset={60}>
            <RichTextEditor.ControlsGroup>
              <RichTextEditor.Bold />
              <RichTextEditor.Italic />
              <RichTextEditor.Underline />
              <RichTextEditor.Strikethrough />
              <RichTextEditor.ClearFormatting />
              <RichTextEditor.Highlight />
              <RichTextEditor.Code />
            </RichTextEditor.ControlsGroup>
          </RichTextEditor.Toolbar>
          <RichTextEditor.Content />
        </RichTextEditor>

        <div className="flex items-center mb-4">
          <Button className="mr-2" onClick={() => generateSummary()}>
            AI 生成摘要
          </Button>
        </div>

        <Textarea
          label="描述"
          placeholder="描述"
          withAsterisk
          disabled={loading}
          {...form.getInputProps('description')}
        />

        <Group justify="flex-end" mt="md">
          <Button type="submit">{id > 0 ? '保存' : '新增'}</Button>
        </Group>
      </form>
    </div>
  );
});

export default Page;
