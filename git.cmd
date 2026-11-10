@if exist "C:\Program Files\Git\cmd\git.exe" (
  @"C:\Program Files\Git\cmd\git.exe" %*
) else if exist "C:\Program Files\Microsoft Visual Studio\18\Community\Common7\IDE\CommonExtensions\Microsoft\TeamFoundation\Team Explorer\Git\cmd\git.exe" (
  @"C:\Program Files\Microsoft Visual Studio\18\Community\Common7\IDE\CommonExtensions\Microsoft\TeamFoundation\Team Explorer\Git\cmd\git.exe" %*
) else (
  @git %*
)
