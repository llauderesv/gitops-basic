# Basic GitOps

A sample GitOps project that uses kustomize to deploy kubernetes resources into cluster.

## What is kustomize

> kustomize lets you customize raw, template-free YAML files for multiple purposes, leaving the original YAML untouched and usable as is.
> kustomize targets kubernetes; it understands and can patch kubernetes style API objects. It's like make, in that what it does is declared in a file, and it's like sed, in that it emits edited text.
>
> source: https://github.com/kubernetes-sigs/kustomize

## File structure

```txt
~/gitops
├── base
│   ├── deployment.yaml
│   ├── kustomization.yaml
│   └── service.yaml
├── envs
│   ├── non-prod
│   │   ├── debug.yaml
│   │   └── kustomization.yaml
│   └── prod
│       ├── kustomization.yaml
│       └── replica_count.yaml
├── kustomization.yaml
└── namespace
    ├── non-prod
    │   ├── kustomization.yaml
    │   └── namespace.yaml
    └── prod
        ├── kustomization.yaml
        └── namespace.yaml
```

## Environments

This projects consist of two environments, `non-prod` and `prod`. Both environments deployed into Kuberentes cluster when executing the `kustomize build kustomize/ | kubectl applf -f -`

For each environment we customize the resource that we deployed. For example in `envs/non-prod` we update the environment `BG_COLOR=palevioletred` to demonstrate that we can customize the environment.

In prod we increase the replica count to `replicas:10` since prod.

This is the power of kustomize. We can template the values and deployed them into multiple environments.

## How to Deploy

```sh
kustomize build kustomize/ | kubectl apply -f -
```

### Verify the installation

`non-prod` environment

```sh
kubectl -n non-prod get all
```

Output:

```txt
NAME                                  READY   STATUS    RESTARTS   AGE
pod/non-prodgitops-864bffd75b-j8jsp   1/1     Running   0          45m
pod/non-prodgitops-864bffd75b-pzz4x   1/1     Running   0          45m

NAME                     TYPE       CLUSTER-IP      EXTERNAL-IP   PORT(S)          AGE
service/non-prodgitops   NodePort   10.98.231.240   <none>        3030:32230/TCP   47m

NAME                             READY   UP-TO-DATE   AVAILABLE   AGE
deployment.apps/non-prodgitops   2/2     2            2           47m

NAME                                        DESIRED   CURRENT   READY   AGE
replicaset.apps/non-prodgitops-855c79b697   0         0         0       47m
replicaset.apps/non-prodgitops-864bffd75b   2         2         2       45m

```

`prod` environment

```sh
kubectl -n prod get all
```

Output:

```txt
pod/prodgitops-7d457f8fcb-29dd2   1/1     Running   0          47m
pod/prodgitops-7d457f8fcb-2tcqh   1/1     Running   0          47m
pod/prodgitops-7d457f8fcb-5rvr2   1/1     Running   0          47m
pod/prodgitops-7d457f8fcb-6thd4   1/1     Running   0          47m
pod/prodgitops-7d457f8fcb-cvdqm   1/1     Running   0          47m
pod/prodgitops-7d457f8fcb-f6nwc   1/1     Running   0          47m
pod/prodgitops-7d457f8fcb-g6rj8   1/1     Running   0          47m
pod/prodgitops-7d457f8fcb-lx7q7   1/1     Running   0          47m
pod/prodgitops-7d457f8fcb-n2p46   1/1     Running   0          47m
pod/prodgitops-7d457f8fcb-xbt86   1/1     Running   0          47m

NAME                 TYPE       CLUSTER-IP       EXTERNAL-IP   PORT(S)          AGE
service/prodgitops   NodePort   10.106.113.239   <none>        3030:30823/TCP   49m

NAME                         READY   UP-TO-DATE   AVAILABLE   AGE
deployment.apps/prodgitops   10/10   10           10          49m

NAME                                    DESIRED   CURRENT   READY   AGE
replicaset.apps/prodgitops-6cb6c7fc69   0         0         0       49m
replicaset.apps/prodgitops-7d457f8fcb   10        10        10      47m
```
