# Inventare Blogger Template

## Introdution

The first thing that i need to write here is: **this is not a full featured blogger template and this is not designed and coded to work perfectly with the blogger visual editor**. **This template is designed to be edited by the code**, builded, and *"installed"* in the blogger. Then, using it with the blogger visual editor (to add widget) can break some styles (because we have some custom classes here from the bootstrap).

## Building

To build the template, we need **Node** and **Yarn** (or **npm**)

### Clone the repository

```bash
git clone https://github.com/inventare/blogger-template.git
cd blogger-template
```

### Install the dependencies

```bash
yarn
```

or, with npm

```bash
npm install
```

### Building

```bash
yarn build
```

or, with npm

```bash
npm run build
```

Then, now, after the build process finished, you can get the template (**XML**) file in the `/dist` path. Then, upload it to the Blogger.

## Customization

Some customizations can be made in this template, and some of there are listed here.

### Language

Some texts of this template are getted from the blogger and only changing the blogger language to your language can made this texts go to your language. But, some other texts are setted by the code and, then, to change it you need to edit this template.

#### English and Portuguese (Brazil)

In the `src/i18n` we have the files `en.html`, `pt.html` and `index.html`. The `en.html` contains the english versions of the texts, and the `pt.html` contains the portuese (brazil) version of the texts. And the `index.html` contains only a include to the used file. To change the text version edit the `index.html` content to make the template includes english version of texts:

```
{% include 'en.html' %}
```

And to make the template includes portuguese version of texts:

```
{% include 'pt.html' %}
```

#### Custom Language

To create a custom language your need to copy the `en.html` (or `pt.html` file) and rename it (`es.html` for example) and edit the assigned variables inside it and, then, change the `index.html` included file (like the before item).

### Colors

To edit colors, is possible to edit the `scss` files in the `src/assets/styles`. The `bootstrap.scss` is a custom version of the bootstrap styles. To edit the orange color, edit the `$inventare` variable inside the `bootstrap.scss`.

### About Author Block

To edit the about author block, go to `src/parts/main/includables/authors`. Copy the `eduardo.html` file and rename it (`jhon.html` for example) and change the texts and image. Now, go to `index.html`, and you see the content bellow:

```html
<b:if cond='data:post.author == &quot;Eduardo Jose&quot;'>
    {% include 'eduardo.html' %}
</b:if>
<b:if cond='data:post.author == &quot;Instituto Inventare&quot;'>
    {% include 'inventare.html' %}
</b:if>
```

You can delete my (Eduardo and Instituto Inventare) authors information and add your own, for example (The `&quot;Jhon&quot;` must be contains your google account name):

```html
<b:if cond='data:post.author == &quot;Jhon&quot;'>
    {% include 'jhon.html' %}
</b:if>
```
