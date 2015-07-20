USE [CityAlert]
GO

/****** Object:  Table [dbo].[SysStatus]    Script Date: 7/20/2015 2:53:04 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[SysStatus](
	[SysStatusId] [int] NOT NULL,
	[Name] [nvarchar](250) NOT NULL,
	[Color] [nvarchar](50) NULL,
 CONSTRAINT [PK_SysStatus] PRIMARY KEY CLUSTERED 
(
	[SysStatusId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO


