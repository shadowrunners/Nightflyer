import { DiscordMessages, DiscordMessage, DiscordEmbed, DiscordEmbedDescription, DiscordEmbedFooter } from '@skyra/discord-components-react';
import { Input, Textarea, Box, Text } from '@chakra-ui/react';
import { SmallColorPickerForm } from './forms/ColorPicker';
import React from 'react';

const Embed = ({ fullData, register, control }) => {
  return (
    <React.Fragment>
      <Box className='flex-1'>
        <Text className='text-xl font-semibold mb-2'>
          Embed Settings
        </Text>

        <Text className='mt-2 ml-1 mb-1 font-semibold'>Author Name</Text>
        <Input
          size="sm"
          className="mb-3 text-white sm"
          {...register('embed.author.name')}
        />

        <Text className='ml-1 mb-1 font-semibold'>Author Icon</Text>
        <Input
          size="sm"
          className="mb-3 text-white"
          {...register('embed.author.iconURL')}
        />

        <Text className='ml-1 mb-2 font-semibold'>Title</Text>
        <Input
          className='text-white mb-3'
          size="sm"
          {...register('embed.title')}
        />

        <Text className='ml-1 font-semibold'>Description</Text>
        <Textarea
          className='mb-3 mt-2 text-white'
          maxLength={2048}
          {...register('embed.description')}
        />

        <Text className='ml-1 mb-2 font-semibold'>Thumbnail</Text>
        <Input
          size="sm"
          className='mb-3 text-white'
          {...register('embed.thumbnail')}
        />

        <Text className='ml-1 mb-2 font-semibold'>Image</Text>
        <Input
          size="sm"
          className='mb-3 text-white'
          {...register('embed.image')}
        />

        <Text className='ml-1 mb-2 font-semibold'>Footer Text</Text>
        <Input
          size="sm"
          className='mb-3 text-white'
          {...register('embed.footer.text')}
        />

        <Text className='ml-1 mb-2 font-semibold'>Footer Icon</Text>
        <Input
          size="sm"
          className='mb-3 text-white'
          {...register('embed.footer.iconURL')}
        />

        <Text className='ml-1 mb-2 font-semibold'>Color</Text>
        <SmallColorPickerForm 
          control={{
            label: 'Color',
          }}
          controller={{
            control, name: 'embed.color'
          }}
        />
      </Box>

      <Box className='flex-1 mr-4 mt-2'>
        <Text className='text-xl font-semibold mb-2'>Embed Preview</Text>
        <DiscordMessages className="rounded-xl grow-0 w-full">
          <DiscordMessage
            author="Evelyn"
            avatar="https://cdn.discordapp.com/avatars/274973338676494347/00dcf84af54a0a58d2394b4054e0f7f5.png?size=100"
          >
          <DiscordMessage>
            {fullData?.embed?.messagecontent}
          </DiscordMessage>
          <DiscordEmbed
            slot='embeds'
            authorName={fullData?.embed?.author?.name}
            authorImage={fullData?.embed?.author?.iconURL}
            color={fullData?.embed?.color}
            embedTitle={fullData?.embed?.title}
            image={fullData?.embed?.image}
            thumbnail={fullData?.embed?.thumbnail}
          >
            <DiscordEmbedDescription slot='description'>
              {fullData?.embed?.description}
            </DiscordEmbedDescription>
            <DiscordEmbedFooter 
              slot='footer'
              footerImage={fullData?.embed?.footer?.iconURL} 
            >
              {fullData?.embed?.footer?.text}
            </DiscordEmbedFooter>
          </DiscordEmbed>
          </DiscordMessage>
        </DiscordMessages>
      </Box>
    </React.Fragment>
  );
};

export default Embed;