<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
    xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:output method="html" indent="yes"/>
  <xsl:template match="/rss">
    <html>
      <head>
        <title>Federation Sun RSS Feed</title>
        <style>
          body {
            font-family: 'Bebas Neue', sans-serif;
            background: #1e1e1e;
            color: white;
            margin: 0;
            padding: 20px;
          }
          a {
            color: gold;
            text-decoration: none;
          }
          a:hover {
            text-decoration: underline;
          }
          h1 {
            text-align: center;
            margin-bottom: 40px;
          }
          .item {
            border-bottom: 1px solid #444;
            padding: 10px 0;
            margin-bottom: 20px;
          }
          .item-title {
            font-size: 20px;
            margin-bottom: 5px;
          }
          .item-date {
            font-size: 12px;
            color: #aaa;
            margin-bottom: 5px;
          }
          .item-description {
            font-size: 14px;
            line-height: 1.4;
          }
        </style>
      </head>
      <body>
        <h1>Federation Sun RSS Feed</h1>
        <xsl:for-each select="channel/item">
          <div class="item">
            <div class="item-title">
              <a href="{link}">
                <xsl:value-of select="title"/>
              </a>
            </div>
            <div class="item-date">
              <xsl:value-of select="pubDate"/>
            </div>
            <div class="item-description">
              <xsl:value-of select="description"/>
            </div>
          </div>
        </xsl:for-each>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
