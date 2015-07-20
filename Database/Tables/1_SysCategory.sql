USE [CityAlert]
GO

/****** Object:  Table [dbo].[SysCategory]    Script Date: 7/20/2015 1:34:38 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[SysCategory](
	[SysCategoryId] [int] NOT NULL,
	[Name] [nvarchar](100) NOT NULL,
	[ParentCategoryId] [int] NULL,
 CONSTRAINT [PK_SysCategory] PRIMARY KEY CLUSTERED 
(
	[SysCategoryId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO


