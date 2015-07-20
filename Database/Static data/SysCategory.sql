USE [CityAlert]
GO
INSERT [dbo].[SysCategory] ([SysCategoryId], [Name], [ParentCategoryId]) VALUES (1, N'Iluminat', NULL)
GO
INSERT [dbo].[SysCategory] ([SysCategoryId], [Name], [ParentCategoryId]) VALUES (2, N'Bec spart', 1)
GO
INSERT [dbo].[SysCategory] ([SysCategoryId], [Name], [ParentCategoryId]) VALUES (3, N'Stalp cazut', 1)
GO
INSERT [dbo].[SysCategory] ([SysCategoryId], [Name], [ParentCategoryId]) VALUES (4, N'Drumuri', NULL)
GO
INSERT [dbo].[SysCategory] ([SysCategoryId], [Name], [ParentCategoryId]) VALUES (5, N'Gropi', 4)